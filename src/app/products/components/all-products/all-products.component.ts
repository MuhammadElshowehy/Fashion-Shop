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
  categories: string[] = [];
  isLoading: boolean = false;
  errorMsg: string = '';

  ngOnInit() {
    this.showProducts();
    this.getAllCategories();
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

  receivedFromErrorComp(data: string) {
    this.errorMsg = data;
  }

  getAllCategories() {
    this.productsService.getAllCategories().subscribe((res: string[]) => {
      // console.log(res);
      res.unshift('all');
      this.categories = res;
      // console.log(this.categories);
    });
  }

  filterBy($event: Event) {
    this.isLoading = true;
    let category: string = (<HTMLButtonElement>$event.target).innerHTML;
    // console.log(category);
    category = category.trim();
    if (category === 'all') {``
      this.showProducts();
    } else {
      this.productsService.filterReq(category).subscribe(
        (res: ProductModel[]) => {
          // console.log(res);
          this.products = res;
          this.isLoading = false;
        },
        (error) => {
          // console.log(error);
          this.errorMsg = this.productsService.handleFetchError(error);
          this.isLoading = false;
        }
      );
    }
  }

  add($event: Event){
    let id = parseInt((<HTMLButtonElement>$event.target).value);
    console.log(id);
  }
}
