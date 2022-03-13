import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { RequestsComponent } from './requests/requests.component';
import { ValidateReqComponent } from './requests/validate-req/validate-req.component';
import { UsersComponent } from './users/users.component';
import { AddContractComponent } from './suppliers/add-contract/add-contract.component';

const routes: Routes = [
  {path:'',redirectTo:'requests',pathMatch:'full'},
  {path: '', component: NavAdminComponent, children:[
    {path:'requests',component:RequestsComponent},
    {path:'requests/:id',component:ValidateReqComponent},
    {path:'users',component:UsersComponent},
    {path:'suppliers',component:SuppliersComponent},
    {path:'suppliers/addContract', component:AddContractComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
