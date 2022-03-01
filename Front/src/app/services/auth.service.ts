import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken:any;
  user:any;
  private authStatusListener = new Subject<boolean>();
  private typeListener = new Subject<string>();

  constructor( private httpClient : HttpClient , private router : Router , private snackbar: MatSnackBar) { }

  login(user: { email: string, password: string }) {


    this.httpClient.post<{success : boolean,status: number,token: any,user: { type: any; }}>('http://localhost:3000/api/employee/login',user).subscribe(res => {


      if(res.success == true) {
        this.storeUserData(res.token,res.user);
        if(res.user.type == 'admin') {

          this.router.navigate(['/admin']);
        }
        else if(res.user.type == 'employee') {
          this.router.navigate(['/employee']);
        }
        this.authStatusListener.next(true);
        this.typeListener.next(res.user.type);
      }else{
        this.authStatusListener.next(false);
      }
    },err => {
      this.authStatusListener.next(false);
      this.snackbar.open("invalid credentials",'close',{duration:3000});
    }
      );
  }

  storeUserData(token:string,user:any){
    this.authToken = token;
    this.user = user;
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
  }

}
