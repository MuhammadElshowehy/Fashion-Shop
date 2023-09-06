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

  getAllCategories() {
    return this.http.get(environment.baseAPI + 'products/categories');
  }

  handleFetchError(error: any) {
    let errorMsg: string = 'sorry, an unknown error occurred!';
    if (error.status === 404) {
      errorMsg = 'page you request not found';
    } else if (error.status === 500) {
      errorMsg = 'server not responding';
    }
    return errorMsg;
  }

  filterReq(category: string) {
    let apiLink = environment.baseAPI + 'products/category/' + category;
    // console.log(apiLink);
    return this.http.get(apiLink);
  }
}
