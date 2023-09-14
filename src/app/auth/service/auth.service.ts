import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  loggedUser: UserModel = {
    email: '',
    password: '',
    isLogged: false,
  };

  usersArray: UserModel[];
  message: string = '';
  isCreatedSuccessfully: boolean = false;
  authUserObs = new BehaviorSubject<UserModel>(null);

  checkTypeOfLocaleStorage() {
    this.usersArray = [];
    let existed = JSON.parse(localStorage.getItem('users'));
    if (Array.isArray(existed)) {
      this.usersArray = existed;
    } else {
      this.usersArray.push(existed);
    }
  }

  addNewUser(newUser: UserModel) {
    if ('users' in localStorage) {
      this.checkTypeOfLocaleStorage();
      let duplicated = this.usersArray.find(
        (user) => user.email === newUser.email
      );
      if (duplicated) {
        this.message = 'This account already exist!';
        return this.message;
      } else {
        this.usersArray.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.usersArray));
        this.message = 'Account created successfully';
        this.isCreatedSuccessfully = true;
        return this.message;
      }
    } else {
      localStorage.setItem('users', JSON.stringify(newUser));
      this.message = 'Account created successfully';
      this.isCreatedSuccessfully = true;
      return this.message;
    }
  }

  emitAuthUser(loggedUser: UserModel) {
    this.authUserObs.next(loggedUser);
  }

  logOut() {
    localStorage.removeItem('authUser');
    this.loggedUser.isLogged = false;
    this.emitAuthUser(this.loggedUser);
    this.router.navigate(['/signin']);
  }
}
