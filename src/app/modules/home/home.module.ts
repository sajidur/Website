import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';



@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
