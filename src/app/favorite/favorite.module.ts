import { NgModule } from '@angular/core';

import { FavoriteComponent } from './component/favorite.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    SharedModule
  ]
})
export class FavoriteModule { }
