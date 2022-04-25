import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SharedService } from 'src/app/services/shared.service';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { ActionLeaveComponent } from '../leaves/action-leave/action-leave.component';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit,OnDestroy {
  notifications : any = [];

  notification : number;
  name: string;
  supscription : Subscription;
  constructor(private sharedService : SharedService,private matSnackBar : MatSnackBar, private matDialog : MatDialog,private employeeService :EmployeeService ,private notificationsService : NotificationsService) { }

  ngOnInit(): void {
    this.getAllNotifications();
    this.sharedService.initializeAppLanguage();
    this.employeeService.userUpdateListener().subscribe( (data:string) =>{
      this.name=data;
    });

    
    this.getNotificationCount();

    setInterval(()=>{
      this.getNotificationCount();
    },10000);

  }

  getNotificationCount(){
    this.supscription = this.notificationsService.notificationCountUpdateListener().subscribe( (data:number) =>{
      this.notification = data;
    });
  }
  onClickAction(id: string){   
    this.matDialog.open(ActionLeaveComponent,{
      width : '1200px',
      data: {id : id}
    });
    this.matDialog.afterAllClosed.subscribe(() => {
      this.getNotificationCount();
    })  
  }

  getAllNotifications(){
    this.notificationsService.getAllNotifications().subscribe((res: {notifications : [] , count : number})=>{
      this.notifications = res.notifications;      
    });
  }

  DeleteNotification(id:string){
    this.notificationsService.deleteNotification(id).subscribe(()=>{
      this.getAllNotifications();
      this.notificationsService.getNotificationCount();
      this.matSnackBar.open('Notification Deleted Successfully','close',{
        duration : 2000
      });
    });
    this.getNotificationCount();

  }

  ClearNotifications(){
    this.notificationsService.clearNotifications().subscribe(()=>{
      this.getAllNotifications();
      this.notificationsService.getNotificationCount();
      this.matSnackBar.open('Notifications Cleared Successfully','close',{
        duration : 2000
      });
    });
    this.getNotificationCount();

  }

  onClickNotifSideBar(){
    this.getAllNotifications();
    this.getNotificationCount();

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
