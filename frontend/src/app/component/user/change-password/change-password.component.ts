import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExceptionsService } from 'src/app/resources/services/exceptions.service';
import { UserDomainService } from 'src/app/resources/services/user-domain.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  protected oldPassword!:string
  protected newPassword!:string
  protected confirmPassword!:string

  constructor(private userDomainService:UserDomainService,private exceptions:ExceptionsService,private router:Router){}

  changePassword(){
    this.userDomainService.changePassword(this.oldPassword).subscribe(
      data => this.exceptions.showMensage('senha mudada com sucesso!','','toast-sucess')
    )
    this.router.navigate([''])

  }

  public confirmPasswordMethod():boolean{
    if(this.newPassword != this.confirmPassword){
      return false
    }
    return true
  }
}
