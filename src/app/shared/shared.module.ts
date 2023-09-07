import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { popupMessageComponent } from './components/popup-message/popup-message.component';
import { ProductsFiltersComponent } from './components/products-filters/products-filters.component';
import { ProductComponent } from './components/product/product.component';
import { CartOrFavoriteEmptyComponent } from './components/cart-or-favorite-empty/cart-or-favorite-empty.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    popupMessageComponent,
    ProductsFiltersComponent,
    ProductComponent,
    CartOrFavoriteEmptyComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    LoadingComponent,
    popupMessageComponent,
    ProductsFiltersComponent,
    ProductComponent,
    CartOrFavoriteEmptyComponent
  ],
})
export class SharedModule {}
