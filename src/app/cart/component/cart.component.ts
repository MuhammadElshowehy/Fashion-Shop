import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/product-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private router: Router) {}

  cartProducts: ProductModel[] = [];
  isEmpty: boolean = true;
  cart: string = 'Cart';
  popupMessage: string = '';
  totalPrice: number = 0;
  validQuantity: boolean = true;

  ngOnInit() {
    let existed = JSON.parse(localStorage.getItem('cart'));
    if (existed) {
      this.isEmpty = false;
      if (!existed.length) {
        this.cartProducts.push(existed);
      } else if (existed.length) {
        this.cartProducts = existed;
        // here: products stored in cartProducts array.
      }
      this.placeDefaultQuantity();
      this.calcTotalPrice();
    }
  }

  placeDefaultQuantity() {
    let arr: ProductModel[] = [];
    for (let product of this.cartProducts) {
      if (!product.quantity) {
        product = Object.assign({ quantity: 1 }, product);
      }
      arr.push(product);
    }
    this.cartProducts = arr;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  calcQuantity(item: ProductModel, event: Event) {
    let quantity: number = +(<HTMLInputElement>event.target).value;
    if (quantity < 1) {
      this.validQuantity = false;
      let alert: string = 'Please insert a positive number!';
      this.popupMessage = alert;
      return;
    } else {
      this.validQuantity = true;
      this.popupMessage = '';
      item.quantity = quantity;
      // console.log(item);
      for (let product of this.cartProducts) {
        if (product.id === item.id) {
          product = item;
        }
      }
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.calcTotalPrice();
    }
  }

  calcTotalPrice() {
    let total: number = 0;
    for (let product of this.cartProducts) {
      total += product.price * product.quantity;
    }
    this.totalPrice = total;
  }

  receivedFromPopup(data: string) {
    this.popupMessage = data;
  }

  removedSuccessfully() {
    let removedMsg: string = 'Product removed successfully';
    this.popupMessage = removedMsg;
  }

  removeAll() {
    localStorage.removeItem('cart');
    this.cartProducts = [];
    this.isEmpty = true;
    this.totalPrice = 0;
  }

  remove(index: number) {
    this.cartProducts.splice(index, 1);
    this.removedSuccessfully();
    if (this.cartProducts.length >= 1) {
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.calcTotalPrice();
    } else {
      localStorage.removeItem('cart');
      this.isEmpty = true;
      this.totalPrice = 0;
    }
  }

  goToCheckOut() {
    if (this.validQuantity === false) {
      return;
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}
