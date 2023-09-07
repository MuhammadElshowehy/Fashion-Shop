import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/product-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: ProductModel[] = [];
  cartProduct: ProductModel;
  isEmpty: boolean = true;
  cart: string = 'Cart';

  ngOnInit() {
    let existed = JSON.parse(localStorage.getItem('cart'));
    if (existed) {
      this.isEmpty = false;
      if (!existed.length) {
        // condition means: existed contain single product:object.
        this.cartProduct = existed;
        // console.log(this.cartProduct);
      } else if (existed.length > 1) {
        this.cartProducts = existed;
        // console.log(this.cartProducts);
      }
    }
  }
}
