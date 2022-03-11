import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthGuard implements CanActivate {
  constructor ( private router : Router , private snackbar : MatSnackBar , private sharedService : SharedService){}

  canActivate(): boolean{
    // const user = JSON.parse(localStorage.getItem('user'));
    const user:any = this.sharedService.getUserFromLocalStorage();
    if (user) {
      this.snackbar.open('You are already logged in', 'close', {
        duration : 3000
      });
      if (user.type == "admin") {
        this.router.navigate(['/admin']);
      }else if (user.type == "employee") {
        this.router.navigate(['/employee/work']);
      }
      return false;
    } else {
      return true;
    }
  }

}
