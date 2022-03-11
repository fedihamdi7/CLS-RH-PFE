import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {
  firstName : String;
  lastName : String;
  constructor( private router:Router, private sharedService : SharedService) { }

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
