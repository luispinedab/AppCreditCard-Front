import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent, NbLogoutComponent, NbRequestPasswordComponent } from '@nebular/auth';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CreditcardsComponent } from './pages/creditcard/creditcards/creditcards.component';
import { FormComponent } from './pages/creditcard/form/form.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {path:'',
   component:PagesComponent,
   children: [
    {path:'form',component:FormComponent,canActivate: [AuthGuard]},
    {path:'form/:id',component:FormComponent,canActivate: [AuthGuard]},
    {path:'creditcard',component:CreditcardsComponent,canActivate: [AuthGuard]},
    {path:'login',component:LoginComponent},
    {path:'',redirectTo:'/login',pathMatch: 'full'},
   ]
  },
  {path:'**',component:NopagefoundComponent},
];

const config: ExtraOptions = {
  useHash: false,
};
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
