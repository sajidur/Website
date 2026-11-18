import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'home',
        data: { seo: { title: 'Application Security, Infrastructure Management, DevOps & AI', description: 'Rex Systems Bangladesh provides application security testing, infrastructure management, DevOps automation and AI solutions for growing businesses in Bangladesh and worldwide.', path: '/home', faq: true } },
        loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule)
          // import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'solutions',
        loadChildren: () => import('src/app/modules/solutions/solutions.module').then((m) => m.SolutionsModule)
      },
      {
        path: 'services',
        data: { seo: { title: 'Website Maintenance Packages', description: 'Fixed monthly website maintenance plans covering backups, uptime monitoring, security patching, SSL monitoring and support, from BDT 1,500 per month.', path: '/services', breadcrumbs: [{ name: 'Maintenance Packages', path: '/services' }] } },
        loadChildren: () => import('src/app/modules/services/services.module').then((m) => m.ServicesModule)
      },
        { path: 'products', component: ProductsComponent, data: { seo: { title: 'Our Products', description: 'Software products by Rex Systems Bangladesh: restaurant POS, point of sale, ERP, accounting, HRMS, club and dealer management, doctor chamber management and more.', path: '/products', breadcrumbs: [{ name: 'Products', path: '/products' }] } } },
        { path: 'about', component: AboutComponent, data: { seo: { title: 'About Us', description: 'Rex Systems Bangladesh is a Dhaka-based technology company providing application security, infrastructure management, DevOps, AI and custom software.', path: '/about', breadcrumbs: [{ name: 'About Us', path: '/about' }] } } },
        { path: 'privacy-policy', component: PrivacyPolicyComponent, data: { seo: { title: 'Privacy Policy', description: 'How Rex Systems Bangladesh collects, uses and protects personal information.', path: '/privacy-policy', breadcrumbs: [{ name: 'Privacy Policy', path: '/privacy-policy' }] } } },
    ]
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 130]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
