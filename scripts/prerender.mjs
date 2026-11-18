// Prerenders every public route into static HTML so search engines and AI
// crawlers (which often do not run JavaScript) receive the full page content.
//
// Usage: npm run build:seo
// Needs Chrome or Edge installed. Set CHROME_PATH to override the auto-detected path.
import { spawn } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';

const DIST = join(process.cwd(), 'dist', 'constrorium');
const PORT = 4999;
const ROUTES = [
  '/home',
  '/solutions/application-security',
  '/solutions/infrastructure-management',
  '/solutions/devops',
  '/solutions/ai-solutions',
  '/products',
  '/services',
  '/about',
  '/privacy-policy',
];

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const chrome = CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('No Chrome/Edge found. Set CHROME_PATH.');
  process.exit(1);
}
if (!existsSync(join(DIST, 'index.html'))) {
  console.error(`Run "ng build" first. Missing ${DIST}`);
  process.exit(1);
}

// Keep the original SPA shell as the fallback for unknown URLs.
const shell = join(DIST, '200.html');
if (!existsSync(shell)) {
  copyFileSync(join(DIST, 'index.html'), shell);
}

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml',
};

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const file = normalize(join(DIST, urlPath));
  const serveShell = !file.startsWith(DIST) || !extname(file) || !existsSync(file);
  const target = serveShell ? shell : file;
  res.writeHead(200, { 'Content-Type': TYPES[extname(target)] || 'application/octet-stream' });
  res.end(readFileSync(target));
});

await new Promise((resolve) => server.listen(PORT, resolve));

const profile = mkdtempSync(join(tmpdir(), 'prerender-'));
const DEBUG_PORT = 9333;
const browser = spawn(chrome, [
  '--headless=new',
  '--disable-gpu',
  `--user-data-dir=${profile}`,
  `--remote-debugging-port=${DEBUG_PORT}`,
  // Block third-party chat widgets so their injected markup is not captured.
  '--host-resolver-rules=MAP embed.tawk.to 127.0.0.1, MAP *.tawk.to 127.0.0.1, MAP connect.facebook.net 127.0.0.1',
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?about:blank`, { method: 'PUT' });
      const target = await res.json();
      const ws = new WebSocket(target.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
      });
      return ws;
    } catch {
      await sleep(300);
    }
  }
  throw new Error('Could not connect to the browser');
}

function client(ws) {
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };
  return (method, params = {}) =>
    new Promise((resolve) => {
      const i = ++id;
      pending.set(i, resolve);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
}

const evaluate = async (send, expression) =>
  (await send('Runtime.evaluate', { expression, returnByValue: true })).result?.result?.value;

try {
  const ws = await connect();
  const send = client(ws);
  await send('Page.enable');

  for (const route of ROUTES) {
    await send('Page.navigate', { url: `http://localhost:${PORT}${route}` });

    // Wait until Angular rendered the page: an h1 plus the page JSON-LD from SeoService.
    let ready = false;
    for (let i = 0; i < 60 && !ready; i++) {
      await sleep(250);
      ready = await evaluate(
        send,
        `location.pathname === ${JSON.stringify(route)} && !!document.querySelector('h1') && !!document.querySelector('script[data-page-jsonld]')`
      );
    }
    if (!ready) {
      throw new Error(`Prerender of ${route} timed out`);
    }
    await sleep(500);

    let html = await evaluate(send, 'document.documentElement.outerHTML');
    // Drop widgets/scripts injected at runtime so the static file stays clean.
    html = html.replace(/<script[^>]*tawk[^>]*><\/script>/gi, '');
    const doc = '<!DOCTYPE html>' + html;

    mkdirSync(join(DIST, route), { recursive: true });
    writeFileSync(join(DIST, route, 'index.html'), doc);
    if (route === '/home') {
      writeFileSync(join(DIST, 'index.html'), doc);
    }
    console.log(`prerendered ${route} (${doc.length} bytes)`);
  }
  ws.close();
} finally {
  browser.kill();
  server.close();
  await sleep(500);
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}
