import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';


// Components
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { SidenavComponent } from './sidenav/sidenav.component';


// Angular Material Modules
import { MaterialModule } from './material/material.module';
import { WorkComponent } from './employee/work/work.component';
import { InternshipComponent } from './employee/internship/internship.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    SidenavComponent,
    WorkComponent,
    InternshipComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
