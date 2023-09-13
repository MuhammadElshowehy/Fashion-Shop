import { NgModule } from '@angular/core';

import { HomeComponent } from './component/home.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
