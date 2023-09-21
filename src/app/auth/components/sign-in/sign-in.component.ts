import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { UserModel } from 'src/app/models/user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  isLoading: boolean = false;
  popupMessage: string = '';
  signinForm: FormGroup;
  emailInput: string = '';
  passInput: string = '';

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/),
      ]),
    });
  }

  showPassword(password: HTMLInputElement){
    this.authService.showPassword(password);
  }

  resetForm() {
    this.signinForm.reset();
  }

  received(data: string) {
    this.popupMessage = data;
  }

  fetchDataFromForm() {
    this.emailInput = this.signinForm.value.email.trim();
    this.passInput = this.signinForm.value.password.trim();
  }

  fetchAllDataOfUser(user: UserModel) {
    this.authService.loggedUser = user;
  }

  signin() {
    let notFound: string = 'There is no account with this email!';
    let wrongPass: string = 'Password is incorrect!';
    if (this.signinForm.valid) {
      this.isLoading = true;
      this.fetchDataFromForm();
      this.authService.checkTypeOfUsersInLocaleStorage();
      let users: UserModel[] = this.authService.usersArray;
      setTimeout(() => {
        if (users.length >= 1) {
          for (let user of users) {
            if (user.email === this.emailInput) {
              if (user.password === this.passInput) {
                this.fetchAllDataOfUser(user);
                this.resetForm();
                this.popupMessage = 'Welcome to HappyCart';
                this.authService.loggedUser.isLogged = true;
                localStorage.setItem(
                  'authUser',
                  JSON.stringify(this.authService.loggedUser)
                );
                this.authService.emitAuthUser(this.authService.loggedUser);
                setTimeout(() => {
                  this.router.navigate(['/home']);
                  this.isLoading = false;
                }, 2500);
                return;
              } else {
                this.popupMessage = wrongPass;
                this.isLoading = false;
              }
            } else {
              this.popupMessage = notFound;
              this.isLoading = false;
            }
          }
        } else {
          this.popupMessage = notFound;
          this.isLoading = false;
        }
      }, 1250);
    }
  }
}
