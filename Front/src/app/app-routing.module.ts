import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CertifComponent } from './employee/certif.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {  path: '',component: AuthComponent},
  {path: 'employee',redirectTo:'employee/work',pathMatch:'full'},
  {path: 'employee', component: SidenavComponent , children:[
    {path: ':type', component: CertifComponent},
  ]},
  {path:'admin' , loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
