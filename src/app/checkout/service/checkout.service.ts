import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  products: ProductModel[] = [];
  totalPriceWithoutShipping: number;

  getProducts() {
    this.products = JSON.parse(localStorage.getItem('cart'));
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
    let shipping: number = 9.99;
    this.totalPriceWithoutShipping += shipping;
    return this.totalPriceWithoutShipping;
  }

  arriveDate() {
    let arriveDate = new Date();
    let numberOfDaysToAdd = 2;
    let result = arriveDate.setDate(arriveDate.getDate() + numberOfDaysToAdd);
    return new Date(result).toLocaleDateString();
  }
}
