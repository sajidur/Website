import { Component, OnDestroy, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { CLIENTS, GENERAL_FAQS, SOLUTIONS } from 'src/app/shared/data/site-content';

@Component({
  selector: 'home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  solutions = SOLUTIONS;
  clients = CLIENTS;
  faqs = GENERAL_FAQS.map((f) => ({ ...f, open: false }));

  slides = [
    {
      title: 'Find and fix application vulnerabilities before attackers do',
      text: 'Penetration testing, secure code review and DevSecOps for your web, mobile and API applications, reported against OWASP standards.',
      icon: 'shield',
      link: ['/solutions', 'application-security'],
      linkLabel: 'Application Security',
      points: ['Web, mobile & API testing', 'Secure code review', 'Re-testing after fixes'],
      stats: [{ value: '8+', label: 'Years in business' }, { value: '50+', label: 'Projects delivered' }],
    },
    {
      title: 'Reliable infrastructure and faster releases, managed for you',
      text: 'We run your servers, backups and monitoring, and automate your build and deployment pipelines so every release is repeatable.',
      icon: 'all_inclusive',
      link: ['/solutions', 'devops'],
      linkLabel: 'DevOps',
      points: ['Server & cloud management', 'CI/CD and containers', 'Monitoring and backups'],
      stats: [{ value: '20+', label: 'Happy clients' }, { value: '15+', label: 'Team members' }],
    },
    {
      title: 'Practical AI built into the way your business works',
      text: 'Assistants, document search and workflow automation, designed around data privacy, accuracy and cost.',
      icon: 'auto_awesome',
      link: ['/solutions', 'ai-solutions'],
      linkLabel: 'AI Solutions',
      points: ['Assistants & chatbots', 'Search over your documents', 'AI security review'],
      stats: [{ value: '4', label: 'Connected service areas' }, { value: '8+', label: 'Years in business' }],
    },
  ];
  slideIndex = 0;
  private timer?: any;

  capabilities = [
    ...SOLUTIONS.map((s) => ({ icon: s.icon, title: s.title, text: s.short, link: ['/solutions', s.slug] })),
    { icon: 'code', title: 'Custom Software', text: 'POS, ERP, e-commerce, hospital systems and mobile apps, built with security and operations included.', link: ['/home'], fragment: 'software' },
  ];

  stats = [
    { value: '8+', label: 'Years in Business' },
    { value: '50+', label: 'Projects Delivered' },
    { value: '20+', label: 'Happy Clients' },
    { value: '15+', label: 'Team Members' },
  ];

  process = [
    {
      title: 'Assess',
      points: ['Review applications, servers and release process', 'Identify real risks and bottlenecks', 'Agree scope and rules of engagement'],
    },
    {
      title: 'Plan',
      points: ['Prioritized roadmap', 'Clear timeline and itemized pricing', 'Named team and point of contact'],
    },
    {
      title: 'Implement',
      points: ['Fix, automate and build', 'Security checks inside the pipeline', 'Regular progress updates'],
    },
    {
      title: 'Operate',
      points: ['Monitoring and maintenance', 'Re-testing and reporting', 'Defined response times'],
    },
  ];

  techGroups = [
    { title: 'Security', items: ['OWASP ZAP', 'Burp Suite', 'Nmap', 'Semgrep', 'SonarQube', 'Trivy'] },
    { title: 'Infrastructure & DevOps', items: ['Linux', 'Windows Server', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'GitHub Actions', 'GitLab CI', 'Prometheus', 'Grafana'] },
    { title: 'AI & Data', items: ['Python', 'FastAPI', 'LangChain', 'Vector databases', 'scikit-learn', 'PyTorch'] },
    { title: 'Application Development', items: ['.NET', 'Node.js', 'Next.js', 'Nest.js', 'Django', 'Android', 'WordPress', 'Shopify'] },
    { title: 'Databases', items: ['Oracle', 'SQL Server', 'Cassandra'] },
  ];

  standards = [
    'OWASP Top 10',
    'OWASP ASVS',
    'CIS Benchmarks',
    'ISO/IEC 27001-aligned controls',
    'DORA metrics',
    'NIST AI RMF',
  ];

  whyUs = [
    { icon: 'link', title: 'One team across the stack', text: 'Security, operations, delivery and AI planned together, so fixes in one area do not create problems in another.' },
    { icon: 'engineering', title: 'Practitioners, not just advisors', text: 'We have built and run production software for years, so our recommendations are practical.' },
    { icon: 'fact_check', title: 'Clear scope and reporting', text: 'Written scope, itemized pricing and plain-language reports you can act on.' },
    { icon: 'lock', title: 'Confidentiality first', text: 'Access is limited to what is needed, and security testing is agreed in writing beforehand.' },
  ];

  softwareServices = [
    'Point of Sale',
    'E-commerce',
    'ERP',
    'Hospital Information Systems',
    'Inventory & Accounting',
    'Recruitment Systems',
    'MIS & Dashboards',
    'Mobile Apps',
  ];

  ngOnInit(): void {
    AOS.init({ duration: 700, once: true });
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  startAutoplay(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => (this.slideIndex = (this.slideIndex + 1) % this.slides.length), 7000);
  }

  goToSlide(i: number): void {
    this.slideIndex = i;
    this.startAutoplay();
  }

  toggleFaq(index: number): void {
    const wasOpen = this.faqs[index].open;
    this.faqs.forEach((f) => (f.open = false));
    this.faqs[index].open = !wasOpen;
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
