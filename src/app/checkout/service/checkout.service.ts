import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  products: ProductModel[] = [];
  totalPriceWithoutShipping: number;
  shipping: number = 9.99;

  getProducts() {
    this.products = JSON.parse(localStorage.getItem('authUser')).cart;
    return this.products;
  }

  totalWithoutShipping() {
    let total: number = 0;
    for (let product of this.products) {
      total += product.price * product.quantity;
    }
    this.totalPriceWithoutShipping = total;
    return total;
  }

  totalWithShipping() {
    let totalToPay: number;
    totalToPay = this.totalPriceWithoutShipping + this.shipping;
    return totalToPay;
  }

  arrivalDate() {
    let arrivalDate = new Date();
    let numberOfDaysToAdd = 2;
    let result = arrivalDate.setDate(arrivalDate.getDate() + numberOfDaysToAdd);
    return new Date(result).toLocaleDateString();
  }
}
