import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { user } from 'src/app/resources/models/user';
import { ExceptionsService } from 'src/app/resources/services/exceptions.service';
import { LoginService } from 'src/app/resources/services/login.service';
import { UserDomainService } from 'src/app/resources/services/user-domain.service';

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
    phone:'test',
    email:'email@'
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