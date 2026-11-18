import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FacebookService, InitParams } from 'ngx-facebook';
import * as AOS from 'aos';
import { filter } from 'rxjs/operators';
import { GENERAL_FAQS } from './shared/data/site-content';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private facebookService: FacebookService,
    private router: Router,
    private route: ActivatedRoute,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.initFacebookService();
    AOS.init({ duration: 700, once: true, offset: 60 });
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.applySeo();
        // Re-scan the new page for [data-aos] elements.
        setTimeout(() => AOS.refreshHard(), 150);
      });
  }

  // Pages that carry `data.seo` in the router config get their meta tags here.
  // Pages with dynamic content (solution detail) set their own.
  private applySeo(): void {
    let current = this.route.snapshot;
    while (current.firstChild) {
      current = current.firstChild;
    }
    const data = current.data['seo'];
    if (!data) {
      return;
    }
    const jsonLd: object[] = [...(data.jsonLd || [])];
    if (data.faq) {
      jsonLd.push(this.seo.faqSchema(GENERAL_FAQS));
    }
    this.seo.set({ ...data, jsonLd });
  }

  // facebook init
  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.2' };
    this.facebookService.init(initParams);
  }
}
