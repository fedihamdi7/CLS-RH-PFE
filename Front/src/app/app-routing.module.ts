import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EmployeeComponent } from './employee/employee.component';
import { InternshipComponent } from './employee/internship/internship.component';
import { WorkComponent } from './employee/work/work.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {  path: '',component: AuthComponent},
  {path: 'employee',redirectTo:'employee/work',pathMatch:'full'},
  {path: 'employee', component: EmployeeComponent,canActivate: [AuthGuard] , children:[
    {path: 'work', component: WorkComponent},
    {path: 'internship', component: InternshipComponent}
  ]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
