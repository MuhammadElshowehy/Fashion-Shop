import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  passForm: FormGroup;
  currentUser: UserModel;
  isLoading: boolean = false;
  popupMessage: string = '';

  ngOnInit() {
    this.fetchUserData();
    this.showUserIcon();

    this.passForm = new FormGroup({
      oldPass: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/),
      ]),
      newPass: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/),
      ]),
    });
  }

  fetchUserData() {
    this.currentUser = JSON.parse(localStorage.getItem('authUser'));
  }

  getUsersAndChangePass() {
    this.authService.checkTypeOfLocaleStorage();
    let users: UserModel[] = this.authService.usersArray;
    for (let user of users) {
      if (
        this.currentUser.email === user.email &&
        this.passForm.value.oldPass === user.password
      ) {
        user.password = this.passForm.value.newPass;
        localStorage.setItem('users', JSON.stringify(users));
        this.popupMessage = 'Password changed successfully';
        this.changePassForAuthUserToo();
        this.passForm.reset();
      } else {
        this.popupMessage = 'Old password is incorrect!';
      }
    }
  }

  changePassForAuthUserToo() {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    authUser.password = this.passForm.value.newPass;
    localStorage.setItem('authUser', JSON.stringify(authUser));
    this.fetchUserData();
  }

  onSubmit() {
    if (this.passForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.getUsersAndChangePass();
        this.isLoading = false;
      }, 1000);
    }
  }

  received(data: string) {
    this.popupMessage = data;
  }

  deleteAccount() {
    let confirm: string = prompt(
      "write 'delete' if you are sure to delete your account?"
    );
    if (confirm === 'delete') {
      this.isLoading = true;
      this.authService.checkTypeOfLocaleStorage();
      let users: UserModel[] = this.authService.usersArray;
      for (let i = 0; i < users.length; i++) {
        if (this.currentUser.email === users[i].email) {
          setTimeout(() => {
            users.splice(i, 1);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.removeItem('cart');
            localStorage.removeItem('favorite');
            this.authService.logOut();
            this.isLoading = false;
          }, 1000);
        }
      }
    }
  }

  // show first letter from first and last name into navbar: //
  showUserIcon() {
    let firstLetterFromFname: string = this.currentUser.fName
      .substring(0, 1)
      .toUpperCase();
    let firstLetterFromLname: string = this.currentUser.lName
      .substring(0, 1)
      .toUpperCase();
    let userIcon: string = firstLetterFromFname + firstLetterFromLname;
    this.userService.showUserIcon(userIcon);
  }
}
