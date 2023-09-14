import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/product-model';
import { CheckoutService } from '../../service/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  products: ProductModel[] = [];
  totalPriceWithoutShipping: number;
  totalToPay: number;
  arriveDate: string;
  // separate //

  creditCardForm: FormGroup;
  billingInfoForm: FormGroup;
  popupMessage: string = '';
  isLoading: boolean = true;

  ngOnInit() {
    this.products = this.checkoutService.getProducts();
    this.totalPriceWithoutShipping =
      this.checkoutService.totalWithoutShipping();
    this.totalToPay = this.checkoutService.totalWithShipping();
    this.arriveDate = this.checkoutService.arriveDate();
    this.isLoading = false;
    // separate //
    this.creditCardForm = new FormGroup({
      nameOnCard: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
      ]),
      cardNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{16}$/),
      ]),
      cvvNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{3}$/),
      ]),
      expDate: new FormControl(null, [Validators.required]),
    });

    this.billingInfoForm = new FormGroup({
      fullName: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
      ]),
      streetAddress: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?:\+20|0)?1\d{9}$/),
      ]),
    });
  }

  receivedFromPopup(event: string) {
    this.popupMessage = event;
  }

  placeOrderClicked() {
    if (this.creditCardForm.valid && this.billingInfoForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        let complete: string = 'Order placed successfully';
        this.popupMessage = complete;
        this.creditCardForm.reset();
        this.billingInfoForm.reset();
      }, 1500);
      // separate //
      setTimeout(() => {
        this.router.navigate(['/home']);
        this.isLoading = false;
      }, 3000);
    }
  }
}
