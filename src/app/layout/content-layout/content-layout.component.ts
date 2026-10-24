import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent {
  showTop = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showTop = window.scrollY > 600;
  }

  toTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  skipToMain(event: Event): void {
    event.preventDefault();
    const main = document.getElementById('main-content');
    main?.focus();
    main?.scrollIntoView();
  }
}
