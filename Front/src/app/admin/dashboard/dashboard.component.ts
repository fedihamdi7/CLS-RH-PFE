import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data = [
    {"name" : "supp1" , "value" : 1200},
    {"name" : "supp2" , "value" : 2000},
    {"name" : "supp3" , "value" : 4500},
    {"name" : "supp4" , "value" : 1700},
    {"name" : "supp5" , "value" : 1000},
    {"name" : "supp6" , "value" : 900},
  ];

  years =[]
  constructor() { }

  ngOnInit(): void {
    // get 15 last years from current year
    let currentYear = new Date().getFullYear();
    for(let i = 0; i < 15; i++){
      this.years.push(currentYear - i);
    }
  }

}
