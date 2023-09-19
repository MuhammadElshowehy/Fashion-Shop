import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FavoriteRoutingModule } from './favorite-routing.module';

import { FavoriteComponent } from './component/favorite.component';



@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    FavoriteRoutingModule,
    SharedModule
  ]
})
export class FavoriteModule { }
