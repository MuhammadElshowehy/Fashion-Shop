import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    if (
      authUser.cart.length >= 1 &&
      authUser.cart[authUser.cart.length - 1].quantity >= 1
    ) {
      return true;
    } else {
      this.router.navigate(['/cart']);
    }
  }
}
