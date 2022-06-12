import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url : string = environment.api_URL+"/api/employee/"; 

  users = new Subject<any>();
  constructor( private http : HttpClient ) { }

  addUser(user: any){
    
  return this.http.post(`${this.url}register`, user);

  }
  getArchivedUsers(){
    return this.http.get(`${this.url}getArchivedEmployees`);
  }
  getUsers(){
    return this.http.get(`${this.url}getEmployees`);
  }
  usersUpdateListener(){
    return this.users.asObservable();
  }

  getEmployeeById(id: string){
    return this.http.get(`${this.url}getEmployeeById/${id}`);
  }

  updateEmployee(id: string, user: any){
    return this.http.put(`${this.url}editUser/${id}`, user);
  }

}
