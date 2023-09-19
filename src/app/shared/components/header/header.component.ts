import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  isLogged: Boolean = false;
  obs: Subscription;
  userLogo: string = '';
  collapsed: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.obs = this.authService.authUserObs.subscribe((user) => {
      if (user) {
        this.isLogged = user.isLogged;
        this.getUserName();
      }
    });
  }

  getUserName() {
    if (localStorage.getItem('authUser')) {
      let authUser: UserModel = JSON.parse(localStorage.getItem('authUser'));
      let FirstLetterFromFName: string = authUser.fName.substring(0, 1);
      let FirstLetterFromLName: string = authUser.lName.substring(0, 1);
      this.userLogo = (
        FirstLetterFromFName + FirstLetterFromLName
      ).toUpperCase();
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
