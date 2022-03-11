import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  firstName : String;
  lastName : String;
  panelOpenState = false;
  constructor( private router:Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
