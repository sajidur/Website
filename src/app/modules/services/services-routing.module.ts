import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PackagesComponent } from './components/packages/packages.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'packages',
    component: PackagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
