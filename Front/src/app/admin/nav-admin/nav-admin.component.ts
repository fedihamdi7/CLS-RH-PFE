import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit,OnDestroy {
  firstName : String;
  lastName : String;
  notification : number;
  private subsription_notification : Subscription; 
  constructor( private router:Router, private sharedService : SharedService, private requestService : RequestsService , private translateService : TranslateService) { }

  ngOnInit(): void {
    let lang = this.sharedService.getLanguageFromLocalStorage();
    if (lang){
    this.translateService.setDefaultLang(lang);
    }else{
      this.translateService.setDefaultLang('en-US');
    }

    let user :any = this.sharedService.getUserFromLocalStorage();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.requestService.getRequestsNotifications();
      this.subsription_notification= this.requestService.notificationUpdateListener().subscribe( (data : any) => {      
      this.notification = data;         
    });
  }


  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);   
    localStorage.setItem('lang', lang);    
    
    
  }
  logout(){
    // localStorage.clear();
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    this.subsription_notification.unsubscribe();
  }
}
