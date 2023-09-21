import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { environment } from 'src/environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  products: ProductModel[] = [];
  cartLength: number;
  favLength: number;

  cartIcon = new BehaviorSubject<number>(null);
  favIcon = new BehaviorSubject<number>(null);

  fetchProducts() {
    return this.http.get<ProductModel[]>(environment.baseAPI + 'products');
  }

  getAllProducts() {
    return this.products.slice();
  }

  getAllCategories() {
    return this.http.get(environment.baseAPI + 'products/categories');
  }

  handleFetchError(error: any) {
    let errorMsg: string = 'sorry, an unknown error occurred!';
    if (error.status === 404) {
      errorMsg = 'page you request not found!';
    } else if (error.status === 500) {
      errorMsg = 'server not responding!';
    }
    return errorMsg;
  }

  filterReq(category: string) {
    let apiLink = environment.baseAPI + 'products/category/' + category;
    // console.log(apiLink);
    return this.http.get(apiLink);
  }

  productDetails(id: number) {
    let apiLink = environment.baseAPI + 'products/' + id;
    return this.http.get(apiLink);
  }

  calcCartLength() {
    if (localStorage.getItem('authUser')) {
      let length: number = JSON.parse(localStorage.getItem('authUser')).cart
        .length;
      this.cartLength = length;
      this.emitCartLength();
      return this.cartLength;
    }
  }

  emitCartLength() {
    this.cartIcon.next(this.cartLength);
  }

  calcFavLength() {
    if (localStorage.getItem('authUser')) {
      let length: number = JSON.parse(localStorage.getItem('authUser')).favorite
        .length;
      this.favLength = length;
      this.emitFavLength();
      return this.favLength;
    }
  }

  emitFavLength() {
    this.favIcon.next(this.favLength);
  }
}
