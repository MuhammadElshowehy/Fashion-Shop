import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { ProductModel } from 'src/app/product-model';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  isLoading: boolean = true;
  productId: number;
  productDetails: any;
  PopupMessage: string = '';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = +params.id;
    });
    this.productsService.productDetails(this.productId).subscribe(
      (res: ProductModel) => {
        this.productDetails = res;
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
}
