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
  PopupMessage: string = '';
  cartProducts: ProductModel[];
  favoriteProducts: ProductModel[];

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
        this.PopupMessage = this.productsService.handleFetchError(error);
        this.isLoading = false;
      }
    );
  }

  receivedFromPopupComp(data: string) {
    this.PopupMessage = data;
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
    if (category === 'all') {
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
          this.PopupMessage = this.productsService.handleFetchError(error);
          this.isLoading = false;
        }
      );
    }
  }

  /** start search method: **/
  search(event: Event) {
    let searchInput = (<HTMLInputElement>event.target).value;
    let searchResult: ProductModel[] = [];
    if (searchInput === '') {
      this.showProducts();
    } else {
      for (let item of this.products) {
        if (item.title.toLowerCase().includes(searchInput.toLowerCase())) {
          searchResult.push(item);
        }
      }
      this.products = searchResult;
    }
  }
  /** end search method. **/

  /** start of add products to cart and localestorage methods: **/
  checkCart() {
    let existed = JSON.parse(localStorage.getItem('cart'));
    // console.log(existed);
    if (!existed.length) {
      this.cartProducts.push(existed);
    } else {
      this.cartProducts = existed;
    }
  }

  addToCart(product: ProductModel) {
    // console.log(product);
    if ('cart' in localStorage) {
      this.cartProducts = [];
      this.checkCart();
      let duplicated = this.cartProducts.find((item) => item.id === product.id);
      if (duplicated) {
        this.alreadyAdded();
        return;
      }
      this.cartProducts.push(product);
      // console.log(this.cartProducts);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.addedSuccessfullyMsg();
    } else {
      localStorage.setItem('cart', JSON.stringify(product));
      this.addedSuccessfullyMsg();
    }
  }
  /** end of add products to cart and localestorage methods. **/

  alreadyAdded() {
    let duplicatedMsg: string = 'Product already added!';
    this.PopupMessage = duplicatedMsg;
  }

  addedSuccessfullyMsg() {
    let addedSuccess = 'Product added successfully.';
    this.PopupMessage = addedSuccess;
  }

  /** start of add products to favorite and localestorage methods: **/
  checkFavorite() {
    let existed = JSON.parse(localStorage.getItem('favorite'));
    // console.log(existed);
    if (!existed.length) {
      this.favoriteProducts.push(existed);
    } else {
      this.favoriteProducts = existed;
    }
  }

  addToFavorite(product: ProductModel) {
    // console.log(product);
    if ('favorite' in localStorage) {
      this.favoriteProducts = [];
      this.checkFavorite();
      let duplicated = this.favoriteProducts.find(
        (item) => item.id === product.id
      );
      if (duplicated) {
        this.alreadyAdded();
        return;
      }
      this.favoriteProducts.push(product);
      // console.log(this.favoriteProducts);
      localStorage.setItem('favorite', JSON.stringify(this.favoriteProducts));
      this.addedSuccessfullyMsg();
    } else {
      localStorage.setItem('favorite', JSON.stringify(product));
      this.addedSuccessfullyMsg();
    }
  }
  /** end of add products to favorite and localestorage methods: **/
}
