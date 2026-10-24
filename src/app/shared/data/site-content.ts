export interface Solution {
  slug: string;
  icon: string;
  title: string;
  short: string;
  tagline: string;
  intro: string;
  audience: string[];
  deliverables: { title: string; text: string }[];
  process: { title: string; text: string }[];
  standards: string[];
  tools: string[];
  faqs: { q: string; a: string }[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'application-security',
    icon: 'shield',
    title: 'Application Security',
    short: 'Find and fix vulnerabilities in your web, mobile and API applications before attackers exploit them.',
    tagline: 'Security testing and secure engineering for web, mobile and APIs.',
    intro:
      'Most breaches start in the application layer: broken access control, injection, weak authentication and vulnerable dependencies. We test your applications the way an attacker would, then help your developers fix what we find and verify the fix.',
    audience: [
      'Companies launching a new web or mobile application',
      'Teams preparing for a customer security review or an audit',
      'Businesses that handle customer, payment or health data',
      'Development teams that want security built into delivery',
    ],
    deliverables: [
      { title: 'Vulnerability assessment', text: 'Automated and manual scanning of applications, including authenticated testing of areas behind login.' },
      { title: 'Penetration testing', text: 'Manual testing of web applications, APIs and mobile apps. Findings are exploited safely to prove real impact, not just reported from a scanner.' },
      { title: 'Secure code review', text: 'Review of source code for insecure patterns, hard-coded secrets and weak input handling, focused on your riskiest components.' },
      { title: 'Dependency and secrets scanning', text: 'Detection of known-vulnerable libraries, container image issues and credentials committed to repositories.' },
      { title: 'Threat modeling', text: 'A structured review of your design to identify what can go wrong before it is built.' },
      { title: 'Report, remediation and re-test', text: 'Each finding includes severity, evidence, affected location and fix guidance. After you fix issues we re-test to confirm they are closed.' },
    ],
    process: [
      { title: 'Scope and authorization', text: 'We agree targets, test windows and rules of engagement in writing. We only test systems you are authorized to test.' },
      { title: 'Discovery', text: 'We map the application, its endpoints, roles and technology stack.' },
      { title: 'Testing', text: 'We run automated scans and manual tests against the agreed standards, preferring a staging environment.' },
      { title: 'Reporting', text: 'You receive an executive summary and a technical report with prioritized findings.' },
      { title: 'Re-test', text: 'We verify fixes and issue an updated report.' },
    ],
    standards: [
      'OWASP Top 10',
      'OWASP API Security Top 10',
      'OWASP ASVS',
      'OWASP MASVS (mobile)',
      'OWASP Web Security Testing Guide',
      'CVSS severity scoring',
    ],
    tools: ['OWASP ZAP', 'Burp Suite', 'Nmap', 'Semgrep', 'SonarQube', 'Trivy', 'Gitleaks'],
    faqs: [
      { q: 'What is the difference between a vulnerability assessment and a penetration test?', a: 'A vulnerability assessment finds and lists weaknesses, mostly using scanners with manual validation. A penetration test goes further: a tester actively tries to exploit weaknesses and chain them together to show real-world impact.' },
      { q: 'Will testing disrupt our live system?', a: 'We prefer to test a staging copy. When production testing is required, we agree on safe test methods and time windows in advance and avoid destructive actions.' },
      { q: 'Do you provide a compliance certificate?', a: 'No. We provide a detailed assessment report that supports your audits and customer security questionnaires. We are not a certification body.' },
    ],
  },
  {
    slug: 'infrastructure-management',
    icon: 'dns',
    title: 'Infrastructure Management',
    short: 'Reliable, monitored and well-maintained servers, databases and cloud resources.',
    tagline: 'Day-to-day management of servers, databases and cloud environments.',
    intro:
      'Outages, missed patches and untested backups are the most common causes of avoidable downtime. We take over the routine work of keeping your infrastructure healthy, so your team can focus on the business.',
    audience: [
      'Businesses without a full-time systems administrator',
      'Teams whose servers have grown without documentation',
      'Companies moving from on-premises to cloud',
      'Websites and applications that must stay online',
    ],
    deliverables: [
      { title: 'Server administration', text: 'Management of Linux and Windows servers, including users, services, web servers and configuration.' },
      { title: 'Monitoring and alerting', text: 'Uptime, CPU, memory, disk and service checks with alerts, so problems are detected before users report them.' },
      { title: 'Backup and disaster recovery', text: 'Scheduled backups, off-site copies and periodic restore tests, with recovery objectives agreed with you.' },
      { title: 'Patching and hardening', text: 'Regular OS and software updates and configuration hardening against recognized baselines.' },
      { title: 'Cloud setup and migration', text: 'Design, deployment, cost review and migration of workloads on cloud or hosted infrastructure.' },
      { title: 'Database administration', text: 'Health checks, performance tuning, backup and access control for Oracle, SQL Server and other databases.' },
      { title: 'SSL/TLS and DNS', text: 'Certificate monitoring and renewal, DNS management and secure web server configuration.' },
      { title: 'Documentation and runbooks', text: 'Written inventory, configuration notes and recovery procedures, so you are never dependent on one person.' },
    ],
    process: [
      { title: 'Audit', text: 'We inventory your servers, services, backups and access, and report the risks.' },
      { title: 'Stabilize', text: 'We fix urgent gaps: backups, patches, exposed services, missing monitoring.' },
      { title: 'Operate', text: 'We monitor and maintain on an agreed schedule with defined response times.' },
      { title: 'Report', text: 'You receive regular reports and recommendations for improvement.' },
    ],
    standards: [
      'CIS Benchmarks (hardening)',
      '3-2-1 backup practice',
      'ITIL-aligned incident and change handling',
      'ISO/IEC 27001-aligned controls',
      'Cloud provider well-architected guidance',
    ],
    tools: ['Linux', 'Windows Server', 'AWS', 'Microsoft Azure', 'Nginx', 'Apache', 'Oracle', 'SQL Server', 'Prometheus', 'Grafana'],
    faqs: [
      { q: 'Can you take over servers that someone else set up?', a: 'Yes. We start with an audit and documentation of what exists, fix urgent risks, and then move to routine management.' },
      { q: 'Do you offer fixed monthly pricing?', a: 'Yes. For websites we offer fixed monthly maintenance packages. For larger environments we quote based on the number of servers and the service level required.' },
      { q: 'How quickly do you respond to incidents?', a: 'Response times are defined by the plan you choose. Our maintenance packages state their response times explicitly.' },
    ],
  },
  {
    slug: 'devops',
    icon: 'all_inclusive',
    title: 'DevOps',
    short: 'Automated build, test and deployment pipelines with security checks built in.',
    tagline: 'CI/CD, containers and infrastructure as code for faster, safer releases.',
    intro:
      'Manual deployments are slow, error-prone and hard to roll back. We automate the path from code commit to production so every release is repeatable, tested and reversible.',
    audience: [
      'Teams deploying manually or by copying files to servers',
      'Companies adopting Docker or Kubernetes',
      'Projects that need staging, testing and production environments',
      'Teams that want security checks in the release process',
    ],
    deliverables: [
      { title: 'CI/CD pipelines', text: 'Automated build, test and deploy workflows on GitHub Actions, GitLab CI or Jenkins, with approvals where needed.' },
      { title: 'Containerization', text: 'Docker images for your applications and, where it fits, Kubernetes for orchestration and scaling.' },
      { title: 'Infrastructure as code', text: 'Environments defined in Terraform or Ansible, version-controlled and reproducible.' },
      { title: 'DevSecOps gates', text: 'Static analysis, dependency, secret and container image scanning as automatic pipeline steps.' },
      { title: 'Release strategy', text: 'Staging environments, rollback procedures and zero-downtime strategies such as blue/green or rolling releases.' },
      { title: 'Observability', text: 'Centralized logs, metrics and dashboards so you can see what the system is doing after each release.' },
    ],
    process: [
      { title: 'Review', text: 'We map your current build, test and release process and its pain points.' },
      { title: 'Design', text: 'We propose a pipeline and environment design that fits your team size and stack.' },
      { title: 'Automate', text: 'We build the pipelines and infrastructure code, and migrate one service at a time.' },
      { title: 'Hand over', text: 'We document and train your team, with optional ongoing support.' },
    ],
    standards: [
      'DORA delivery metrics',
      'Twelve-Factor App',
      'GitOps practices',
      'NIST Secure Software Development Framework',
      'OWASP DevSecOps guidance',
    ],
    tools: ['Git', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'],
    faqs: [
      { q: 'We are a small team. Is DevOps overkill?', a: 'Not if kept proportionate. Even a simple pipeline that builds, tests and deploys on every merge removes most manual errors, and it does not require Kubernetes.' },
      { q: 'Can you work with our existing repositories and cloud?', a: 'Yes. We build on the tools you already use rather than forcing a new platform.' },
      { q: 'Will you change our application code?', a: 'Only where needed, for example adding a health check or a configuration setting. Pipelines and infrastructure are separate from application logic.' },
    ],
  },
  {
    slug: 'ai-solutions',
    icon: 'auto_awesome',
    title: 'AI Solutions',
    short: 'Practical AI assistants, automation and analytics integrated into your existing systems.',
    tagline: 'AI features and automation designed around privacy, accuracy and cost.',
    intro:
      'AI is useful when it is attached to a real business task and measured. We help you identify where AI actually saves time or money, build it into your systems, and secure it against the risks specific to AI.',
    audience: [
      'Businesses with many documents, emails or support requests to process',
      'Product teams adding AI features to an existing application',
      'Organizations that need answers from internal knowledge bases',
      'Teams concerned about the privacy and safety of AI tools',
    ],
    deliverables: [
      { title: 'AI opportunity assessment', text: 'We review your workflows and rank the use cases by value, effort and risk before any build starts.' },
      { title: 'Assistants and chatbots', text: 'Customer-facing or internal assistants built on large language models, with defined scope and fallbacks to a human.' },
      { title: 'Search over your documents', text: 'Retrieval-augmented generation that answers questions from your own documents and cites the source.' },
      { title: 'Workflow and document automation', text: 'Extraction, classification and summarization of documents, forms and messages, with human review where accuracy matters.' },
      { title: 'Predictive analytics', text: 'Forecasting and classification models built on your business data.' },
      { title: 'AI security review', text: 'Testing for prompt injection, data leakage and unsafe tool use, and review of what data is sent to model providers.' },
      { title: 'Evaluation and monitoring', text: 'Test sets and dashboards to track answer quality, latency and cost over time.' },
    ],
    process: [
      { title: 'Discover', text: 'We define the task, success measure and data available.' },
      { title: 'Prototype', text: 'We build a small working version and test it on real examples.' },
      { title: 'Evaluate', text: 'We measure accuracy, cost and risk against the agreed target.' },
      { title: 'Integrate', text: 'We connect it to your systems with access controls, logging and monitoring.' },
    ],
    standards: [
      'NIST AI Risk Management Framework',
      'OWASP Top 10 for LLM Applications',
      'Data minimization and least-privilege access',
      'Human-in-the-loop review for high-impact decisions',
    ],
    tools: ['Python', 'FastAPI', 'Hosted and open-source LLMs', 'Vector databases', 'LangChain', 'scikit-learn', 'PyTorch'],
    faqs: [
      { q: 'Will our data be used to train public models?', a: 'We choose providers and settings that do not train on your data, and where required we use models hosted in your own environment. We document exactly what data leaves your systems.' },
      { q: 'How do you deal with AI giving wrong answers?', a: 'We ground answers in your documents, show sources, restrict scope, measure accuracy on test cases, and keep a human reviewer for important outputs.' },
      { q: 'Do we need a large dataset?', a: 'Often not. Many useful applications, such as document search or assistants, work with your existing documents and need no model training.' },
    ],
  },
];

export const GENERAL_FAQS = [
  {
    q: 'How does the free consultation work?',
    a: 'It is a no-obligation call to understand your systems and goals. Afterwards we send a clear scope and an itemized quote.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'Application security, infrastructure management, DevOps and AI. We also build custom software, including POS, ERP, e-commerce and mobile apps.',
  },
  {
    q: 'Can you work with our in-house team?',
    a: 'Yes. Many engagements are a single area, such as a security assessment or a CI/CD pipeline, delivered alongside your own developers or IT staff.',
  },
  {
    q: 'How do you protect our information?',
    a: 'We work under a confidentiality agreement when requested, limit access to what is needed, and agree testing scope in writing before any security work.',
  },
  {
    q: 'Do you provide support after delivery?',
    a: 'Yes. Maintenance packages and custom support agreements are available, with response times stated up front.',
  },
];

export const CONTACT_INTERESTS = [
  'Application Security',
  'Infrastructure Management',
  'DevOps',
  'AI Solutions',
  'Website Maintenance',
  'Custom Software',
  'Other',
];

export const CLIENTS = [
  { name: 'BDDOT', link: 'https://bddot.com/', image: 'assets/images/clients/bddots.png' },
  { name: 'Dhaka Handicrafts Limited.', link: 'https://dhakahandicrafts.com/', image: 'assets/images/clients/dhaka_handicraft_logo.png' },
  { name: 'Chittagong University Public Administration Ex-Student Forum, Dhaka', link: 'https://cupaesfd.org/', image: 'assets/images/clients/cupaLogo.png' },
  { name: 'Excellence Shoes', link: '', image: 'assets/images/clients/excellenceshoe.png' },
  { name: 'Fair Pattern', link: 'https://www.fairpattern.com/', image: 'assets/images/clients/fairpattern.png' },
  { name: 'Opsio Cloud', link: 'https://opsiocloud.com/', image: 'assets/images/clients/opsio.png' },
  { name: 'AFS Energy', link: 'https://afsenergy.ae/', image: 'assets/images/clients/afs.png' },
  { name: 'Metlinx LLC', link: 'https://metlinx.com/', image: 'assets/images/clients/metlinx.png' },
  { name: 'Home Expro Solutions', link: 'https://www.homexprosolutions.com/', image: 'assets/images/clients/homeexpro.png' },
  { name: 'Look space Solutions', link: 'https://lookspaces.com/', image: 'assets/images/clients/lookspace.png' },
  { name: 'Lakeland Home Management LLC', link: 'https://lakelandhomemgt.com/', image: 'assets/images/clients/lakeland.png' },
  { name: 'CCDB', link: 'https://ccdbbd.org/', image: 'assets/images/clients/ccdb.png' },
  { name: 'tlce', link: 'https://www.tlece.com/', image: 'assets/images/clients/tlece.png' },
  { name: 'inteamhealth', link: 'https://www.inteamhealth.com/', image: 'assets/images/clients/inteamhealth.png' },
  { name: 'bonik', link: 'https://www.bonik.online/', image: 'assets/images/clients/bonik.png' },
  { name: 'Grameen Distribution', link: 'https://grameendistribution.com/', image: 'assets/images/clients/gdl-logo.png' },
];
