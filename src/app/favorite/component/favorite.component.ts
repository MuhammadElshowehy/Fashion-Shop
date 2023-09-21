import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { UserModel } from 'src/app/models/user-model';
import { ProductsService } from 'src/app/products/service/products.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  constructor(private productsService: ProductsService){}

  favoriteProducts: ProductModel[];
  authUser: UserModel;
  isEmpty: boolean = true;
  isLoading: boolean = false;
  favorite: string = 'Favorite';
  PopupMessage: string = '';

  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser'));
  }

  setAuthUser(authUser: UserModel) {
    localStorage.setItem('authUser', JSON.stringify(authUser));
  }

  ngOnInit() {
    this.authUser = this.getAuthUser();
    this.favoriteProducts = this.authUser.favorite;
    if (this.favoriteProducts.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
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
      this.favoriteProducts.splice(index, 1);
      this.authUser.favorite = this.favoriteProducts;
      this.removedSuccessfully();
      this.setAuthUser(this.authUser);
      if (this.authUser.favorite.length === 0) {
        this.isEmpty = true;
      }
      this.isLoading = false;
      this.productsService.calcFavLength();
    }, 1000);
  }

  removeAll() {
    this.isLoading = true;
    setTimeout(() => {
      this.favoriteProducts = [];
      this.authUser.favorite = [];
      this.setAuthUser(this.authUser);
      this.isEmpty = true;
      this.isLoading = false;
      this.productsService.calcFavLength();
    }, 1000);
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
      this.authUser = this.getAuthUser();
      let duplicated = this.authUser.cart.find(
        (item: ProductModel) => item.id === product.id
      );
      if (duplicated) {
        this.isLoading = false;
        this.alreadyAdded();
        return;
      } else {
        this.authUser.cart.push(product);
        this.setAuthUser(this.authUser);
        this.isLoading = false;
        this.addedSuccessfully();
        this.productsService.calcCartLength();
      }
    }, 1000);
  }
}
