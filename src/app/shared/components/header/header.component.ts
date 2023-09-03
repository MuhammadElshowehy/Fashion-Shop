import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private renderer: Renderer2) {}

  collapsed: boolean = true;
  @ViewChild('user') userMenu: ElementRef;
  isOpen: boolean = false;

  open() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.setStyle(this.userMenu.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.userMenu.nativeElement, 'display', 'none');
    }
  }
}
