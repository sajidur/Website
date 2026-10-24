import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://rexsystemsbd.com';
export const SITE_NAME = 'Rex Systems Bangladesh';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/og-image.png`;

export interface SeoData {
  title: string;
  description: string;
  /** Path beginning with "/", used for the canonical URL. */
  path: string;
  image?: string;
  noindex?: boolean;
  /** JSON-LD objects added to the page head. */
  jsonLd?: object[];
  /** Breadcrumb trail after "Home", e.g. [{ name: 'Maintenance', path: '/services' }]. */
  breadcrumbs?: { name: string; path: string }[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  set(data: SeoData): void {
    const url = SITE_URL + data.path;
    const image = data.image || DEFAULT_IMAGE;
    const fullTitle = data.title.includes(SITE_NAME) ? data.title : `${data.title} | ${SITE_NAME}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'robots', content: data.noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large' });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);

    const graph: object[] = [...(data.jsonLd || [])];
    if (data.breadcrumbs?.length) {
      graph.push(this.breadcrumbList(data.breadcrumbs));
    }
    this.setJsonLd(graph);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(items: object[]): void {
    this.doc.head.querySelectorAll('script[data-page-jsonld]').forEach((el) => el.remove());
    items.forEach((item) => {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-jsonld', '');
      script.text = JSON.stringify({ '@context': 'https://schema.org', ...item });
      this.doc.head.appendChild(script);
    });
  }

  private breadcrumbList(trail: { name: string; path: string }[]): object {
    const all = [{ name: 'Home', path: '/home' }, ...trail];
    return {
      '@type': 'BreadcrumbList',
      itemListElement: all.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: SITE_URL + c.path,
      })),
    };
  }

  faqSchema(faqs: { q: string; a: string }[]): object {
    return {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
  }
}
