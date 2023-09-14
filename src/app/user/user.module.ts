import { NgModule } from '@angular/core';

import { UserComponent } from './component/user.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    SharedModule, CommonModule, ReactiveFormsModule
  ]
})
export class UserModule { }
