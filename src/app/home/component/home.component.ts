import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popupMessage: string;
  isLoading: boolean = false;
  contactForm: FormGroup;

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      msg: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  send() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        let msg: string = 'Your message sent successfully, thank you.';
        this.popupMessage = msg;
        this.contactForm.reset();
        this.isLoading = false;
      }, 1000);
    }
  }

  received(data: string) {
    this.popupMessage = data;
  }
}
