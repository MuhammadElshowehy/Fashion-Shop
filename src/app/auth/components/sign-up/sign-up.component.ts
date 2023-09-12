import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

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
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/),
      ]),
    });
  }

  resetForm() {
    this.signupForm.reset();
  }

  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm);
      this.resetForm();
    }
  }
}
