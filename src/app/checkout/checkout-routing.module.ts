import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { CheckoutGuard } from './checkout-guard.service';
import { CheckoutComponent } from './component/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, CheckoutGuard],
    component: CheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
