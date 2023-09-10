import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CartModule } from './cart/cart.module';
import { FavoriteModule } from './favorite/favorite.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { CheckoutModule } from './checkout/checkout.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    CartModule,
    FavoriteModule,
    HomeModule,
    UserModule,
    ProductsModule,
    AuthModule,
    CheckoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
