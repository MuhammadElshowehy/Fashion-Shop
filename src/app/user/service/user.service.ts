import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userIcon: string;

  showUserIcon(userIcon: string) {
    setTimeout(() => {
      this.userIcon = userIcon;
    }, 750);
  }
}
