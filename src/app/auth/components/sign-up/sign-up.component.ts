import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  popupMessage: string = '';
  isLoading: boolean;
  signupForm: FormGroup;

  newUser: UserModel = {
    fName: '',
    lName: '',
    isLogged: false,
    email: '',
    password: '',
    cart: [],
    favorite: [],
    orders: [],
  };

  ngOnInit() {
    this.signupForm = new FormGroup({
      fName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
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

  received(data: string) {
    this.popupMessage = data;
  }

  resetForm() {
    this.signupForm.reset();
  }

  fetchDataFromForm() {
    this.newUser.fName = this.signupForm.value.fName.trim();
    this.newUser.lName = this.signupForm.value.lName.trim();
    this.newUser.email = this.signupForm.value.email.trim();
    this.newUser.password = this.signupForm.value.password.trim();
  }

  signup() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.fetchDataFromForm();
      setTimeout(() => {
        this.popupMessage = this.authService.addNewUser(this.newUser);
        this.isLoading = false;
      }, 1250);
      setTimeout(() => {
        if (this.authService.isCreatedSuccessfully) {
          this.resetForm();
          this.router.navigate(['/signin']);
        }
      }, 2500);
    }
  }
}
