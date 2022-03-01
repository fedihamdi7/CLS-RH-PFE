import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  panelOpenState = false;
  constructor( private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
