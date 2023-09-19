import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent
  ],
  imports: [
    ProductsRoutingModule,
    SharedModule,
  ]
})
export class ProductsModule { }
