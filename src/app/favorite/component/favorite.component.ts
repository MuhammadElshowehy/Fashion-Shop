import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  favoriteProducts: ProductModel[];
  authUser: UserModel;
  isEmpty: boolean = false;
  isLoading: boolean = false;
  favorite: string = 'Favorite';
  PopupMessage: string = '';

  ngOnInit() {
    this.authUser = JSON.parse(localStorage.getItem('authUser'));
    this.favoriteProducts = this.authUser.favorite;
    if (!this.favoriteProducts) {
      this.isEmpty = true;
    }
  }

  receivedFromPopup($event: string) {
    this.PopupMessage = $event;
  }

  removedSuccessfully() {
    let removedMsg: string = 'Product removed successfully';
    this.PopupMessage = removedMsg;
  }

  remove(index: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.authUser.favorite.splice(index, 1);
      this.removedSuccessfully();
      localStorage.setItem('authUser', JSON.stringify(this.authUser));
      if (this.authUser.favorite.length < 1) {
        this.isEmpty = true;
      }
      this.isLoading = false;
    }, 1000);
  }

  removeAll() {
    this.isLoading = true;
    setTimeout(() => {
      this.favoriteProducts = [];
      this.authUser.favorite = [];
      localStorage.setItem('authUser', JSON.stringify(this.authUser));
      this.isEmpty = true;
      this.isLoading = false;
    }, 1000);
  }

  isDuplicated(arr: ProductModel[], product: ProductModel) {
    let duplicated = arr.find((item) => item.id === product.id);
    if (duplicated) {
      return true;
    } else {
      return false;
    }
  }

  alreadyAdded() {
    let duplicatedMsg: string = 'This product already in your cart!';
    this.PopupMessage = duplicatedMsg;
  }

  addedSuccessfully() {
    let addedSuccessfully: string = 'Product added successfully';
    this.PopupMessage = addedSuccessfully;
  }

  addToCart(product: ProductModel) {
    this.isLoading = true;
    setTimeout(() => {
      this.authUser = JSON.parse(localStorage.getItem('authUser'));
      let duplicated = this.authUser.cart.find(
        (item: ProductModel) => item.id === product.id
      );
      if (duplicated) {
        this.isLoading = false;
        this.alreadyAdded();
        return;
      } else {
        this.authUser.cart.push(product);
        localStorage.setItem('authUser', JSON.stringify(this.authUser));
        this.isLoading = false;
        this.addedSuccessfully();
      }
    }, 1000);
  }
}
