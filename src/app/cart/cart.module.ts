import { NgModule } from '@angular/core';

import { CartComponent } from './component/cart.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class CartModule { }
