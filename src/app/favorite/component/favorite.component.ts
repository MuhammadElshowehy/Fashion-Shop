import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/product-model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  favoriteProducts: ProductModel[] = [];
  isEmpty: boolean = true;
  favorite: string = 'Favorite';
  PopupMessage: string = '';

  ngOnInit() {
    let existed = JSON.parse(localStorage.getItem('favorite'));
    if (existed) {
      this.isEmpty = false;
      if (!existed.length) {
        // condition means: existed contain single product:object.
        this.favoriteProducts.push(existed);
      } else if (existed.length) {
        // condition means: existed contain array of products:[].
        this.favoriteProducts = existed;
      }
    }
  }

  receivedFromPopup($event: string) {
    this.PopupMessage = $event;
  }

  removedSuccessfully(){
    let removedMsg: string = 'Product removed successfully';
    this.PopupMessage = removedMsg;
  }

  remove(index: number) {
    this.favoriteProducts.splice(index, 1);
    this.removedSuccessfully();
    if (this.favoriteProducts.length >= 1) {
      localStorage.setItem('favorite', JSON.stringify(this.favoriteProducts));
    } else {
      localStorage.removeItem('favorite');
      this.isEmpty = true;
    }
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
    if (localStorage.getItem('cart')) {
      let cartInLocale = JSON.parse(localStorage.getItem('cart'));
      if (cartInLocale.length) {
        if (this.isDuplicated(cartInLocale, product)) {
          this.alreadyAdded();
          return;
        } else {
          cartInLocale.push(product);
          localStorage.setItem('cart', JSON.stringify(cartInLocale));
          this.addedSuccessfully();
        }
      } else {
        let singleProduct: ProductModel[] = [];
        singleProduct.push(cartInLocale);
        if (this.isDuplicated(singleProduct, product)) {
          this.alreadyAdded();
          return;
        } else {
          singleProduct.push(product);
          localStorage.setItem('cart', JSON.stringify(singleProduct));
          this.addedSuccessfully();
        }
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(product));
      this.addedSuccessfully();
    }
  }
}
