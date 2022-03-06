import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { WorkComponent } from './employee/work.component';
import { AuthGuard } from './guards/auth.guard';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {  path: '',component: AuthComponent},
  {path: 'employee',redirectTo:'employee/work',pathMatch:'full'},
  {path: 'employee', component: SidenavComponent , children:[
    {path: ':type', component: WorkComponent},
  ]},
  {path:'admin' , loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', redirectTo:''}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
