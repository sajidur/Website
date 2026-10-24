import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Solution, SOLUTIONS } from 'src/app/shared/data/site-content';
import { SeoService, SITE_NAME, SITE_URL } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit, OnDestroy {
  solution?: Solution;
  others: Solution[] = [];
  openFaq = 0;

  private sub?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private seo: SeoService) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const found = SOLUTIONS.find((s) => s.slug === params.get('slug'));
      if (!found) {
        this.router.navigate(['/home']);
        return;
      }
      this.solution = found;
      this.others = SOLUTIONS.filter((s) => s.slug !== found.slug);
      this.openFaq = 0;
      this.seo.set({
        title: found.title,
        description: `${found.short} ${found.tagline}`,
        path: `/solutions/${found.slug}`,
        breadcrumbs: [{ name: found.title, path: `/solutions/${found.slug}` }],
        jsonLd: [
          {
            '@type': 'Service',
            name: found.title,
            description: found.intro,
            serviceType: found.title,
            url: `${SITE_URL}/solutions/${found.slug}`,
            provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
            areaServed: 'Worldwide',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${found.title} services`,
              itemListElement: found.deliverables.map((d) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: d.title, description: d.text },
              })),
            },
          },
          this.seo.faqSchema(found.faqs),
        ],
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleFaq(i: number): void {
    this.openFaq = this.openFaq === i ? -1 : i;
  }
}
