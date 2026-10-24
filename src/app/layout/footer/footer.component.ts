import { Component } from '@angular/core';
import { SOLUTIONS } from 'src/app/shared/data/site-content';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  solutions = SOLUTIONS;
  currentYear = new Date().getFullYear();
}
