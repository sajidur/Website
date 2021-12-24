import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/doctor-list',
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
    ]
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/home/doctor-list', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
