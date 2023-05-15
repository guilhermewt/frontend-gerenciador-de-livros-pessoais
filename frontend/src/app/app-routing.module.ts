import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component'
import { LivroCreateComponent } from './component/livro/livro-create/livro-create.component'
import { BookUpdateComponent } from './component/livro/book-update/book-update.component';
import { LivroRemoveComponent } from './component/livro/livro-remove/livro-remove.component';
import { LoanComponent } from './component/loan/loan-read/loan-read.component'
import { LoanCreateComponent } from './component/loan/loan-create/loan-create.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './resources/services/auth.service';
import { AuthGuardService } from './resources/services/auth-guard.service';
import { ChangePasswordComponent } from './component/user/change-password/change-password.component'
import { CreateUserComponent } from './component/user/create-user/create-user.component'

const routes: Routes = [
  {
    path:'',
   
    component: LivroCrudComponent
  },
  {
    path:'create',
   
    component:LivroCreateComponent
  },
  {
    path:'updatebook/:id',
    canActivate:[AuthGuardService],
    component:BookUpdateComponent
  },
  {
    path:'deletebook/:id',
    canActivate:[AuthGuardService],
    component:LivroRemoveComponent
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
