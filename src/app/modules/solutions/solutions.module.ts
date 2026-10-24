import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';

const routes: Routes = [
  { path: ':slug', component: SolutionDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [SolutionDetailComponent],
  imports: [CommonModule, MaterialModule, SharedModule, RouterModule.forChild(routes)],
})
export class SolutionsModule { }
