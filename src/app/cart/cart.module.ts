import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CartComponent } from './component/cart.component';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CartRoutingModule,
    SharedModule,
  ]
})
export class CartModule { }
