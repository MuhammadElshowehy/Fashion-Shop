import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { popupMessageComponent } from './components/popup-message/popup-message.component';
import { ProductsFiltersComponent } from './components/products-filters/products-filters.component';
import { ProductComponent } from './components/product/product.component';
import { CartOrFavoriteEmptyComponent } from './components/cart-or-favorite-is-empty/cart-or-favorite-empty.component';
import { GoToUpComponent } from './components/go-to-up-button/go-to-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    popupMessageComponent,
    ProductsFiltersComponent,
    ProductComponent,
    CartOrFavoriteEmptyComponent,
    GoToUpComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    popupMessageComponent,
    ProductsFiltersComponent,
    ProductComponent,
    CartOrFavoriteEmptyComponent,
    GoToUpComponent,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}
