import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/product-model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  products: ProductModel[] = [];

  fetchProducts() {
    return this.http.get<ProductModel[]>(environment.baseAPI + 'products');
  }

  getAllProducts() {
    return this.products.slice();
  }

  handleFetchError(error: any) {
    let errorMsg: string = 'sorry, an unknown error occur';
    if (error.status === 404) {
      errorMsg = 'page you request not found';
    } else if (error.status === 500) {
      errorMsg = 'server not responding';
    }
    return errorMsg;
  }

  /** start filters methods **/
  filterByElectronics() {
    return this.http.get(environment.baseAPI + 'products/category/electronics');
  }

  filterByJewelry() {
    return this.http.get(environment.baseAPI + 'products/category/jewelery');
  }

  filterByMenClothes() {
    return this.http.get(
      environment.baseAPI + "products/category/men's clothing"
    );
  }
  filterByWomenClothes() {
    return this.http.get(
      environment.baseAPI + "products/category/women's clothing"
    );
  }
  /** end filters methods **/
}
