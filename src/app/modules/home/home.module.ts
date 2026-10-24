import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './components/main/main.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactusService } from 'src/app/shared/services/contactus.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    RouterModule
  ],
  providers: [ContactusService],
})
export class HomeModule { }
