import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material/material.module';
import { ContactSectionComponent } from '../contact-section/contact-section.component';

@NgModule({
  declarations: [ContactSectionComponent],
  imports: [CommonModule, FormsModule, NgxSpinnerModule, MaterialModule],
  exports: [ContactSectionComponent]
})
export class SharedModule { }
