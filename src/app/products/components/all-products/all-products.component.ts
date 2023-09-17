import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsService } from '../../service/products.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  products: ProductModel[] = [];
  categories: string[] = [];
  isLoading: boolean = true;
  PopupMessage: string = '';
  authUser: UserModel;
  isLogged: boolean = false;
  obs: Subscription;

  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser'));
  }

  setAuthUser(authUser: UserModel) {
    localStorage.setItem('authUser', JSON.stringify(authUser));
  }

  ngOnInit() {
    this.showProducts();
    this.getAllCategories();
    this.obs = this.authService.authUserObs.subscribe((user) => {
      if (user) {
        this.isLogged = user.isLogged;
      }
    });
  }

  showProducts() {
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

  getAllCategories() {
    this.productsService.getAllCategories().subscribe(
      (res: string[]) => {
        res.unshift('all');
        this.categories = res;
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

  filterBy($event: Event) {
    this.isLoading = true;
    let category: string = (<HTMLButtonElement>$event.target).innerHTML;
    category = category.trim();
    if (category === 'all') {
      this.showProducts();
    } else {
      this.productsService.filterReq(category).subscribe(
        (res: ProductModel[]) => {
          this.products = res;
          this.isLoading = false;
        },
        (error) => {
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
  addToCart(product: ProductModel) {
    this.isLoading = true;
    this.authUser = this.getAuthUser();
    setTimeout(() => {
      let duplicated = this.authUser.cart.find(
        (item) => item.id === product.id
      );
      if (duplicated) {
        this.isLoading = false;
        this.alreadyAdded();
        return;
      } else {
        this.authUser.cart.push(product);
        this.addedSuccessfullyMsg();
        this.setAuthUser(this.authUser);
        this.isLoading = false;
        return;
      }
    }, 1000);
  }
  /** end of add products to cart and localestorage methods. **/

  alreadyAdded() {
    let duplicatedMsg: string = 'Product already added!';
    this.PopupMessage = duplicatedMsg;
  }

  addedSuccessfullyMsg() {
    let addedSuccess = 'Product added successfully';
    this.PopupMessage = addedSuccess;
  }

  /** start of add products to favorite and localestorage methods: **/
  addToFavorite(product: ProductModel) {
    this.isLoading = true;
    this.authUser = this.getAuthUser();
    setTimeout(() => {
      let duplicated = this.authUser.favorite.find(
        (item) => item.id === product.id
      );
      if (duplicated) {
        this.isLoading = false;
        this.alreadyAdded();
        return;
      } else {
        this.authUser.favorite.push(product);
        this.addedSuccessfullyMsg();
        this.setAuthUser(this.authUser);
        this.isLoading = false;
        return;
      }
    }, 1000);
  }
  /** end of add products to favorite and localestorage methods: **/

  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
