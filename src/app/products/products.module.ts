import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
  ]
})
export class ProductsModule { }
