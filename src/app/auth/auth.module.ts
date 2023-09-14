import { NgModule } from '@angular/core';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [SharedModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}
