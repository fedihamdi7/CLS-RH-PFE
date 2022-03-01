import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// Angular Material Modules
import { MaterialModule } from './material/material.module';

// Components
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WorkComponent } from './employee/work/work.component';
import { InternshipComponent } from './employee/internship/internship.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    AppRoutingModule,
    HttpClientModule,
    PdfViewerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
