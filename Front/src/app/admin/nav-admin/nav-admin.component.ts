import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationsService } from 'src/app/services/notifications.service';
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
  supscription : Subscription;
  constructor(private sharedService : SharedService, private matDialog : MatDialog,private employeeService :EmployeeService ,private notificationsService : NotificationsService) { }

  ngOnInit(): void {
    this.sharedService.initializeAppLanguage();
    this.employeeService.userUpdateListener().subscribe( (data:string) =>{
      this.name=data;
    });

    
    this.supscription = this.notificationsService.notificationCountUpdateListener().subscribe( (data:number) =>{
      this.notification = data;
    });
    setInterval(()=>{
      this.supscription = this.notificationsService.notificationCountUpdateListener().subscribe( (data:number) =>{
        this.notification = data;
      });
    },10000);
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
    this.supscription.unsubscribe();
  }
}
