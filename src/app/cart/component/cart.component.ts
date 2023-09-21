import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { UserModel } from 'src/app/models/user-model';
import { ProductsService } from 'src/app/products/service/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  cartProducts: ProductModel[] = [];
  authUser: UserModel;
  isEmpty: boolean = true;
  isLoading: boolean = false;
  cart: string = 'Cart';
  popupMessage: string = '';
  totalPrice: number = 0;
  validQuantity: boolean = true;

  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser'));
  }

  setAuthUser(authUser: UserModel) {
    localStorage.setItem('authUser', JSON.stringify(authUser));
  }

  ngOnInit() {
    this.authUser = this.getAuthUser();
    this.cartProducts = this.placeDefaultQuantity(this.authUser.cart);
    this.authUser.cart = this.cartProducts;
    this.setAuthUser(this.authUser);
    this.calcTotalPrice();
    if (this.cartProducts.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  placeDefaultQuantity(cart: ProductModel[]) {
    let edited: ProductModel[] = [];
    for (let product of cart) {
      if (!product.quantity) {
        product = Object.assign({ quantity: 1 }, product);
        edited.push(product);
      } else {
        edited.push(product);
      }
    }
    return edited;
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
      this.productsService.calcCartLength();
    }, 1000);
  }

  remove(index: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.cartProducts.splice(index, 1);
      this.removedSuccessfully();
      this.authUser.cart = this.cartProducts;
      this.setAuthUser(this.authUser);
      if (this.cartProducts.length) {
        this.calcTotalPrice();
      } else {
        this.isEmpty = true;
        this.totalPrice = 0;
      }
      this.isLoading = false;
      this.productsService.calcCartLength();
    }, 1000);
  }

  goToCheckOut() {
    this.isLoading = true;
    if (this.validQuantity === false) {
      return;
    } else {
      setTimeout(() => {
        this.router.navigate(['/checkout']);
        this.isLoading = false;
      }, 1000);
    }
  }
}
