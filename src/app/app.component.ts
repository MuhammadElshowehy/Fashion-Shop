import { Component } from '@angular/core';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    if (authUser) {
      this.authService.emitAuthUser(authUser);
    }
  }
}
