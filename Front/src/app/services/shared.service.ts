import { Injectable } from '@angular/core';
import ls from 'localstorage-slim';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  putTokenInLocalStorage(token : string){
    // localStorage.setItem('id_token',token);
    ls.set('id_token', token, { encrypt: true });
  }
  getTokenFromLocalStorage(){
    // return localStorage.getItem('id_token');
    return ls.get('id_token', { decrypt: true });
  }

  putUserInLocalStorage(user: any){
    // localStorage.setItem('user',JSON.stringify(user));
    ls.set('user', user,  { encrypt: true });
  }
  getUserFromLocalStorage(){
    // return JSON.parse(localStorage.getItem('user'));
    return ls.get('user', { decrypt: true });
  }
}
