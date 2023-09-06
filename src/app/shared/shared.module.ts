import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ProductsFiltersComponent } from './components/products-filters/products-filters.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ErrorMessageComponent,
    ProductsFiltersComponent,
    ProductComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    LoadingComponent,
    ErrorMessageComponent,
    ProductsFiltersComponent,
    ProductComponent
  ],
})
export class SharedModule {}
