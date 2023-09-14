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

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/),
      ]),
    });
  }

  resetForm() {
    this.signinForm.reset();
  }

  received(data: string) {
    this.popupMessage = data;
  }

  fetchDataFromForm() {
    this.authService.loggedUser.email = this.signinForm.value.email.trim();
    this.authService.loggedUser.password =
      this.signinForm.value.password.trim();
  }

  signin() {
    if (this.signinForm.valid) {
      this.isLoading = true;
      this.fetchDataFromForm();
      this.authService.checkTypeOfLocaleStorage();
      let users: UserModel[] = this.authService.usersArray;
      setTimeout(() => {
        for (let user of users) {
          if (
            user.email === this.authService.loggedUser.email &&
            user.password === this.authService.loggedUser.password
          ) {
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
          }
        }
        this.popupMessage = 'Email or password is incorrect!';
        this.isLoading = false;
      }, 1250);
    }
  }
}
