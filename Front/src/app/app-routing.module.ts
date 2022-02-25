import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { InternshipComponent } from './employee/internship/internship.component';
import { WorkComponent } from './employee/work/work.component';

const routes: Routes = [
  {  path: '',component: AppComponent},
  {path: 'employee',redirectTo:'employee/work',pathMatch:'full'},
  {path: 'employee', component: EmployeeComponent , children:[
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
