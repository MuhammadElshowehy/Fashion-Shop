import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-go-to-up',
  templateUrl: './go-to-up.component.html',
  styleUrls: ['./go-to-up.component.css'],
})
export class GoToUpComponent {
  show: boolean;
  position = 100;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.position) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  goToTop() {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
