import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
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
        loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule)
          // import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'services',
        loadChildren: () => import('src/app/modules/services/services.module').then((m) => m.ServicesModule)
      },
        { path: 'privacy-policy', component: PrivacyPolicyComponent },
    ]
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
