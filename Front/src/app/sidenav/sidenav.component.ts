import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  firstName : String;
  lastName : String;
  panelOpenState = false;
  constructor( private router:Router ,  private employeeService :EmployeeService , private translateService : TranslateService) { }

  ngOnInit(): void {
    this.employeeService.userUpdateListener().subscribe( (data:any) =>{
      this.firstName = data;
    });
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);    
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
