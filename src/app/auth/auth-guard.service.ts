import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './service/auth.service';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  obs: Subscription;
  isLogged: Boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.obs = this.authService.authUserObs.subscribe((user) => {
      if (user) {
        if (user.isLogged) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      }
    });

    if (this.isLogged) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }
}
