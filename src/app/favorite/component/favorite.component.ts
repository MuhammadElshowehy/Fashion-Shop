import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/product-model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  favoriteProducts: ProductModel[] = [];
  favoriteProduct: ProductModel;
  isEmpty: boolean = true;
  favorite: string = 'Favorite';

  ngOnInit() {
    let existed = JSON.parse(localStorage.getItem('favorite'));
    if (existed) {
      this.isEmpty = false;
      if (!existed.length) {
        // existed contain single product or object.
        this.favoriteProduct = existed;
        // console.log(this.favoriteProduct);
      } else if (existed.length > 1) {
        this.favoriteProducts = existed;
        // console.log(this.favoriteProducts);
      }
    }
  }
}
