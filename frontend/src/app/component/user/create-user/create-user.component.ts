import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { user } from 'src/app/component/user/user-models/user.model';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { LoginService } from 'src/app/component/login/login-services/login.service';
import { UserDomainService } from 'src/app/component/user/user-services/user-domain.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  user:user = {
    name:'test',
    username:'',
    password:'',
    email:'well@mail'
  }

  confirmPassword:string = ''

  constructor(private userdomainService:UserDomainService,private router:Router,private exception:ExceptionsService){}

  createUser():void{
      this.userdomainService.createUserService(this.user).subscribe(
        (data) => {   
          this.exception.showMensage('operação bem sucedida','usuario cadastrado','toast-sucess'),
          this.router.navigate(['/login'])
        });
  }

  cancel(){
    this.router.navigate(['/login'])
  }

  public confirmPasswordMethod():boolean{
    if(this.user.password != this.confirmPassword){
      return false
    }
    return true
  }

}