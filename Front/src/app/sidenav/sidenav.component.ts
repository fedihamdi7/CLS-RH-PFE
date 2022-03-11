import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  firstName : String;
  lastName : String;
  panelOpenState = false;
  constructor( private router:Router , private sharedService : SharedService) { }

  ngOnInit(): void {
    let user :any = this.sharedService.getUserFromLocalStorage();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
