import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popupMessage: string;
  contactForm: FormGroup;

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      msg: new FormControl(null, Validators.required),
    });
  }

  send() {
    if (this.contactForm.valid) {
      let msg: string = 'Your message sent successfully, thank you.';
      this.popupMessage = msg;
      this.contactForm.reset();
    }
  }

  received(data: string) {
    this.popupMessage = data;
  }
}
