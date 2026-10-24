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

  tabIndex = 0;
  private timer?: any;
  private paused = false;

  stats = [
    { value: '8+', label: 'Years in business' },
    { value: '50+', label: 'Projects delivered' },
    { value: '20+', label: 'Happy clients' },
    { value: '15+', label: 'Team members' },
  ];

  trust = ['Free consultation', 'Written scope & pricing', 'Plain-language reports'];

  bento = [
    ...SOLUTIONS.map((s, i) => ({
      no: '0' + (i + 1),
      icon: s.icon,
      title: s.title,
      text: s.short,
      points: s.deliverables.slice(0, 4).map((d) => d.title),
      link: ['/solutions', s.slug] as any[],
      fragment: undefined as string | undefined,
    })),
  ];

  process = [
    { icon: 'search', title: 'Assess', text: 'We review your applications, servers and release process to find the real risks and bottlenecks.' },
    { icon: 'checklist', title: 'Plan', text: 'A prioritized roadmap with clear scope, timeline and itemized pricing before work begins.' },
    { icon: 'build', title: 'Implement', text: 'We fix, automate and build with security checks inside the pipeline and regular updates.' },
    { icon: 'monitor_heart', title: 'Operate', text: 'Monitoring, maintenance and re-testing with response times agreed up front.' },
  ];

  techTab = 0;
  techGroups = [
    { title: 'Security', items: ['OWASP ZAP', 'Burp Suite', 'Nmap', 'Semgrep', 'SonarQube', 'Trivy'] },
    { title: 'Infrastructure & DevOps', items: ['Linux', 'Windows Server', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'GitHub Actions', 'GitLab CI', 'Prometheus', 'Grafana'] },
    { title: 'AI & Data', items: ['Python', 'FastAPI', 'LangChain', 'Vector databases', 'scikit-learn', 'PyTorch'] },
    { title: 'Application development', items: ['.NET', 'Node.js', 'Next.js', 'Nest.js', 'Django', 'Android', 'WordPress', 'Shopify'] },
    { title: 'Databases', items: ['Oracle', 'SQL Server', 'Cassandra'] },
  ];

  standards = [
    { name: 'OWASP Top 10 & ASVS', area: 'Application security' },
    { name: 'CIS Benchmarks', area: 'Server hardening' },
    { name: 'ISO/IEC 27001-aligned controls', area: 'Information security' },
    { name: 'DORA metrics', area: 'Delivery performance' },
    { name: 'NIST AI RMF', area: 'AI risk management' },
  ];

  whyUs = [
    { icon: 'hub', title: 'One team across the stack', text: 'Security, operations, delivery and AI planned together, so a fix in one area does not create a problem in another.' },
    { icon: 'engineering', title: 'Practitioners, not just advisors', text: 'We have built and run production software for years, so our recommendations are practical.' },
    { icon: 'fact_check', title: 'Clear scope and reporting', text: 'Written scope, itemized pricing and plain-language reports you can act on.' },
    { icon: 'lock', title: 'Confidentiality first', text: 'Access is limited to what is needed, and security testing is agreed in writing beforehand.' },
  ];

  softwareServices = [
    'Point of Sale', 'E-commerce', 'ERP', 'Hospital Information Systems',
    'Inventory & Accounting', 'Recruitment Systems', 'MIS & Dashboards', 'Mobile Apps',
  ];

  ngOnInit(): void {
    AOS.init({ duration: 700, once: true, offset: 60 });
    this.timer = setInterval(() => {
      if (!this.paused) {
        this.tabIndex = (this.tabIndex + 1) % this.solutions.length;
      }
    }, 6000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  selectTab(i: number): void {
    this.tabIndex = i;
    this.paused = true;
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
