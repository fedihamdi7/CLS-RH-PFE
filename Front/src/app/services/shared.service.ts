import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  putTokenInLocalStorage(token : string){
    localStorage.setItem('id_token',token);
  }
  getTokenFromLocalStorage(){
    return localStorage.getItem('id_token');
  }

  putUserInLocalStorage(user: any){
    localStorage.setItem('user',JSON.stringify(user));
  }
  getUserFromLocalStorage(){
    return JSON.parse(localStorage.getItem('user'));
  }
}
