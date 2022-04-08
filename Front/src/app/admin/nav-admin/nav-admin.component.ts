import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { SharedService } from 'src/app/services/shared.service';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit,OnDestroy {

  notification : number;
  name: string;
  private subsription_notification : Subscription; 
  constructor(private sharedService : SharedService, private matDialog : MatDialog,private employeeService :EmployeeService) { }

  ngOnInit(): void {
    this.sharedService.initializeAppLanguage();
    // let user :User = this.sharedService.getUserFromLocalStorage();
    // this.firstName = user.firstName;
    // this.lastName = user.lastName;
    this.employeeService.userUpdateListener().subscribe( (data:string) =>{     
      this.name=data;
    });
  }

  EditProfile(){
    this.matDialog.open(AdminProfileComponent,{
      width : '700px',
      height : 'auto',
    });
  }
  changeLanguage(lang: string) {
    this.sharedService.changeLanguage(lang);
  }
  logout(){
    this.sharedService.logout();
  }

  ngOnDestroy(){
    this.subsription_notification.unsubscribe();
  }
}
