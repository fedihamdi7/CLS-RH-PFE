import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router) { }
  //get user from local storage and parse to json object
  user = JSON.parse(localStorage.getItem('user'));
  type = this.user.type;

  canActivate(): boolean {
    if (this.type == 'admin') {
      return true;
    }
    else {
      //check if connected
      if (this.user) {
        this.router.navigate(['/employee/work']);
        return false
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }

}
