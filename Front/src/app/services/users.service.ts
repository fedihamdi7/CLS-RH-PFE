import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users = new Subject<any>();
  constructor( private http : HttpClient ) { }

  addUser(user: any){

  return this.http.post('http://localhost:3000/api/employee/register', user);

  }

  getUsers(){
    this.http.get('http://localhost:3000/api/employee/getEmployees').subscribe(
      (data : any) => {
        this.users.next(data.employee);
      }
    );
  }
  usersUpdateListener(){
    return this.users.asObservable();
  }

}
