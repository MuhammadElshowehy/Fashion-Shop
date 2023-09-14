import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  isLogged: Boolean = false;
  obs: Subscription;
  constructor(private renderer: Renderer2, private authService: AuthService) {}

  ngOnInit() {
    this.obs = this.authService.authUserObs.subscribe((user) => {
      if (user) {
        this.isLogged = user.isLogged;
        console.log(this.isLogged);
      }
    });
  }

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

  logOut() {
    this.isLoading = true;
    setTimeout(() => {
      this.authService.logOut();
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
