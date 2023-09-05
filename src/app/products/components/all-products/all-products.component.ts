import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/product-model';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  products: ProductModel[] = [];
  isLoading: boolean = false;
  errorMsg: string = '';

  ngOnInit() {
    this.showProducts();
  }

  showProducts() {
    this.isLoading = true;
    this.productsService.fetchProducts().subscribe(
      (res: ProductModel[]) => {
        this.productsService.products = res;
        this.products = this.productsService.getAllProducts().reverse();
        this.isLoading = false;
      },
      (error) => {
        this.errorMsg = this.productsService.handleFetchError(error);
        this.isLoading = false;
      }
    );
  }

  received(data: string) {
    this.errorMsg = data;
  }

  filterByAll() {
    this.showProducts();
  }

  filterByElectronics() {
    this.isLoading = true;
    this.productsService.filterByElectronics().subscribe(
      (res: ProductModel[]) => {
        this.products = res;
        this.isLoading = false;
      },
      (error) => {
        this.errorMsg = this.productsService.handleFetchError(error);
        this.isLoading = false;
      }
    );
  }

  filterByJewelry() {
    this.isLoading = true;
    this.productsService.filterByJewelry().subscribe(
      (res: ProductModel[]) => {
        this.products = res;
        this.isLoading = false;
      },
      (error) => {
        this.errorMsg = this.productsService.handleFetchError(error);
        this.isLoading = false;
      }
    );
  }

  filterByMenClothes() {
    this.isLoading = true;
    this.productsService.filterByMenClothes().subscribe(
      (res: ProductModel[]) => {
        this.products = res;
        this.isLoading = false;
      },
      (error) => {
        this.errorMsg = this.productsService.handleFetchError(error);
        this.isLoading = false;
      }
    );
  }

  filterByWomenClothes() {
    this.isLoading = true;
    this.productsService.filterByWomenClothes().subscribe(
      (res: ProductModel[]) => {
        this.products = res;
        this.isLoading = false;
      },
      (error) => {
        this.errorMsg = this.productsService.handleFetchError(error);
        this.isLoading = false;
      }
    );
  }
}
