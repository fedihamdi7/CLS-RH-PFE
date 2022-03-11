import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient , private sharedService : SharedService) { }

  //read id_token from local storage
  id_token = this.sharedService.getTokenFromLocalStorage();

  // put token in header
   headers = {
    'Authorization': 'jwt ' + this.id_token
  };

  // userLocal = JSON.parse(localStorage.getItem('user'));
  userLocal :any = this.sharedService.getUserFromLocalStorage();
  data = {
    id: this.userLocal._id,
    firstName : this.userLocal.firstName,
    lastName : this.userLocal.lastName,
    cin : this.userLocal.cin,
    date_in : this.userLocal.date_in,
    date_out : this.userLocal.date_out,
    job_title : this.userLocal.job_title,
    department : this.userLocal.department,
    type : null
}

  getRequests(type : string){
    return this.http.get('http://localhost:3000/api/employee/getRequest/'+type,{headers:this.headers});
  }

  addRequest(type : string){
    //add type to data object
    this.data.type = type;
    return this.http.post('http://localhost:3000/api/employee/addRequest',this.data,{headers:this.headers});
  }
}
