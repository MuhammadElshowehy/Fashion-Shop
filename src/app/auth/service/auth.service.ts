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
    fName: '',
    lName: '',
    isLogged: false,
    email: '',
    password: '',
    cart: [],
    favorite: [],
    orders: [],
  };

  usersArray: UserModel[];
  message: string = '';
  isCreatedSuccessfully: boolean = false;
  authUserObs = new BehaviorSubject<UserModel>(null);

  checkTypeOfUsersInLocaleStorage() {
    this.usersArray = [];
    if (localStorage.getItem('users')) {
      let existed = JSON.parse(localStorage.getItem('users'));
      if (existed) {
        if (Array.isArray(existed)) {
          this.usersArray = existed;
        } else {
          this.usersArray.push(existed);
        }
      }
    }
  }

  addNewUser(newUser: UserModel) {
    if ('users' in localStorage) {
      this.checkTypeOfUsersInLocaleStorage();
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
    return this.loggedUser.isLogged;
  }

  logOut() {
    this.saveUserDataBeforeLoggedOut();
    localStorage.removeItem('authUser');
    this.loggedUser.isLogged = false;
    this.emitAuthUser(this.loggedUser);
    this.router.navigate(['/signin']);
  }

  saveUserDataBeforeLoggedOut() {
    this.checkTypeOfUsersInLocaleStorage();
    let authUser: UserModel = JSON.parse(localStorage.getItem('authUser'));
    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.usersArray[i].email === authUser.email) {
        this.usersArray.splice(i, 1, authUser);
        localStorage.setItem('users', JSON.stringify(this.usersArray));
      }
    }
  }
}
