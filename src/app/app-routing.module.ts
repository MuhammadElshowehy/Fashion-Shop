import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/component/home.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './cart/component/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FavoriteComponent } from './favorite/component/favorite.component';
import { UserComponent } from './user/component/user.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: AllProductsComponent},
  {path: 'products/:id', component: ProductsDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'favorite', component: FavoriteComponent},
  {path: 'user', component: UserComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
