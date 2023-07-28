import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookReadComponent } from './component/book/book-read/book-read.component'; 
import { BookCreateComponent } from './component/book/book-create/book-create.component'
import { BookUpdateComponent } from './component/book/book-update/book-update.component';
import { BookRemoveComponent } from './component/book/book-remove/book-remove.component';
import { LoanComponent } from './component/loan/loan-read/loan-read.component'
import { LoanCreateComponent } from './component/loan/loan-create/loan-create.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './component/auth/auth-services/auth.service';
import { AuthGuardService } from './component/auth/auth-services/auth-guard.service';
import { ChangePasswordComponent } from './component/user/change-password/change-password.component'
import { CreateUserComponent } from './component/user/create-user/create-user.component'

const routes: Routes = [
  {
    path:'',
    canActivate:[AuthGuardService],
    component: BookReadComponent
  },
  {
    path:'create',
    canActivate:[AuthGuardService],
    component:BookCreateComponent
  },
  {
    path:'updatebook/:id',
    canActivate:[AuthGuardService],
    component:BookUpdateComponent
  },
  {
    path:'deletebook/:id',
    canActivate:[AuthGuardService],
    component:BookRemoveComponent
  },
  {
    path:'loan/:id',
    canActivate:[AuthGuardService],
    component:LoanComponent
  },
  {
    path:'loan-create/:idBook',
    canActivate:[AuthGuardService],
    component:LoanCreateComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'change/password',
    component:ChangePasswordComponent
  },
  {
    path:'create/user',
    component:CreateUserComponent
  }
  ,
  {
    path:'**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
