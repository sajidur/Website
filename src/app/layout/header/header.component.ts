import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SOLUTIONS } from 'src/app/shared/data/site-content';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  solutions = SOLUTIONS;
  menuOpen = false;
  openMenu = '';
  scrolled = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 4;
  }

  toggleMenu(name: string): void {
    this.openMenu = this.openMenu === name ? '' : name;
  }

  closeMenus(): void {
    this.menuOpen = false;
    this.openMenu = '';
  }

  goToContact(): void {
    this.closeMenus();
    const el = document.getElementById('contact-id');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      this.router.navigate(['/home'], { fragment: 'contact-id' });
    }
  }
}
