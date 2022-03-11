import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {
  firstName : String;
  lastName : String;
  constructor( private router:Router) { }

  ngOnInit(): void {
    //get user name from user json in local storage
    let user = JSON.parse(localStorage.getItem('user'));
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
