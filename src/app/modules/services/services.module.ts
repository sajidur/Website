import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesRoutingModule } from './services-routing.module';
import { MainComponent } from './components/main/main.component';
import { PackagesComponent } from './components/packages/packages.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    MainComponent,
    PackagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesRoutingModule,
    MatButtonModule,
    MatCardModule,
    NgxSpinnerModule
  ]
})
export class ServicesModule { }
