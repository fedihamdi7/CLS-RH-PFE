import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http : HttpClient ) { }

  addUser(user: any){

  return this.http.post('http://localhost:3000/api/employee/register', user);

  }
}
