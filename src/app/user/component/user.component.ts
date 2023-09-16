import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthService) {}
  passwordForm: FormGroup;
  currentUser: UserModel;
  isLoading: boolean = false;
  popupMessage: string = '';

  ngOnInit() {
    this.fetchUserData();

    this.passwordForm = new FormGroup({
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

  getUsersAndChangePassword() {
    this.authService.checkTypeOfUsersInLocaleStorage();
    let users: UserModel[] = this.authService.usersArray;
    for (let user of users) {
      if (
        this.currentUser.email === user.email &&
        this.passwordForm.value.oldPass === user.password
      ) {
        user.password = this.passwordForm.value.newPass;
        localStorage.setItem('users', JSON.stringify(users));
        this.popupMessage = 'Password changed successfully';
        this.changePassForAuthUserToo();
        this.passwordForm.reset();
      } else {
        this.popupMessage = 'Old password is incorrect!';
      }
    }
  }

  changePassForAuthUserToo() {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    authUser.password = this.passwordForm.value.newPass;
    localStorage.setItem('authUser', JSON.stringify(authUser));
    this.fetchUserData();
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.getUsersAndChangePassword();
        this.isLoading = false;
      }, 1000);
    }
  }

  received(data: string) {
    this.popupMessage = data;
  }

  deleteAccount() {
    let confirm: string = prompt(
      "write 'delete' if you are sure to delete your account"
    );
    if (confirm === 'delete') {
      this.isLoading = true;
      this.authService.checkTypeOfUsersInLocaleStorage();
      let users: UserModel[] = this.authService.usersArray;
      for (let i = 0; i < users.length; i++) {
        if (this.currentUser.email === users[i].email) {
          setTimeout(() => {
            users.splice(i, 1);
            localStorage.setItem('users', JSON.stringify(users));
            this.authService.logOut();
            this.isLoading = false;
          }, 1000);
        }
      }
    }
  }
}
