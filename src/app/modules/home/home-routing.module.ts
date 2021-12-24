import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'doctor-list',
    pathMatch: 'full'
  },
  {
    path: 'doctor-list',
    component: DoctorListComponent
  },
  { 
    path: 'doctor-list/details', 
    component: DoctorDetailsComponent 
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
