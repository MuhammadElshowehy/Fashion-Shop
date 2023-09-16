import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private router: Router) {}

  cartProducts: ProductModel[] = [];
  authUser: UserModel;
  isEmpty: boolean = false;
  isLoading: boolean = false;
  cart: string = 'Cart';
  popupMessage: string = '';
  totalPrice: number = 0;
  validQuantity: boolean = true;

  getAuthUser() {
    this.authUser = JSON.parse(localStorage.getItem('authUser'));
    return this.authUser;
  }

  setAuthUser(authUser: UserModel) {
    localStorage.setItem('authUser', JSON.stringify(authUser));
  }

  ngOnInit() {
    this.cartProducts = this.getAuthUser().cart;
    this.placeDefaultQuantity();
    this.calcTotalPrice();
    if (!this.cartProducts) {
      this.isEmpty = true;
    }
  }

  placeDefaultQuantity() {
    for (let product of this.cartProducts) {
      if (!product.quantity) {
        product = Object.assign({ quantity: 1 }, product);
      }
    }
    this.authUser.cart = this.cartProducts;
    this.setAuthUser(this.authUser);
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
      item.quantity = quantity;
      for (let product of this.cartProducts) {
        if (product.id === item.id) {
          product = item;
        }
      }
      this.authUser.cart = this.cartProducts;
      this.setAuthUser(this.authUser);
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
    this.isLoading = true;
    setTimeout(() => {
      this.cartProducts = [];
      this.authUser.cart = [];
      this.setAuthUser(this.authUser);
      this.isEmpty = true;
      this.totalPrice = 0;
      this.isLoading = false;
    }, 1000);
  }

  remove(index: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.cartProducts.splice(index, 1);
      this.removedSuccessfully();
      this.authUser.cart = this.cartProducts;
      this.setAuthUser(this.authUser);
      if (this.cartProducts) {
        this.calcTotalPrice();
      } else {
        this.isEmpty = true;
        this.totalPrice = 0;
      }
      this.isLoading = false;
    }, 1000);
  }

  goToCheckOut() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.validQuantity === false) {
        return;
      } else {
        this.router.navigate(['/checkout']);
      }
      this.isLoading = false;
    }, 1000);
  }
}
