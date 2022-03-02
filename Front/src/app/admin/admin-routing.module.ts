import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { RequestsComponent } from './requests/requests.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',redirectTo:'requests',pathMatch:'full'},
  {path: '', component: NavAdminComponent, children:[
    {path:'requests',component:RequestsComponent},
    {path:'users',component:UsersComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
