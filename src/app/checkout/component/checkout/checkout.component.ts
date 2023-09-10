import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/product-model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: ProductModel[] = [];
  totalPriceWithoutShipping: number;
  shipping: number = 9.99;
  totalToPay: number;
  date: string;

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart'));
    this.totalPrice();
    this.arriveDate();
  }

  totalPrice() {
    let total: number = 0;
    for (let product of this.products) {
      total += product.price * product.quantity;
    }
    this.totalPriceWithoutShipping = total;
    total += this.shipping;
    this.totalToPay = total;
  }

  arriveDate() {
    let arriveDate = new Date();
    let numberOfDaysToAdd = 2;
    let result = arriveDate.setDate(arriveDate.getDate() + numberOfDaysToAdd);
    this.date = new Date(result).toLocaleDateString();
  }
}
