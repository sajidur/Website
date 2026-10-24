import { Component } from '@angular/core';
import { SOLUTIONS } from 'src/app/shared/data/site-content';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  solutions = SOLUTIONS;

  stats = [
    { value: '8+', label: 'Years in Business' },
    { value: '50+', label: 'Projects Delivered' },
    { value: '20+', label: 'Happy Clients' },
    { value: '15+', label: 'Team Members' },
  ];
}
