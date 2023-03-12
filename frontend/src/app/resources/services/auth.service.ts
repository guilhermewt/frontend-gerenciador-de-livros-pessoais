import { Injectable } from '@angular/core';
import { responseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public loginResponse!:responseLogin;

  public clear():void{
    this.loginResponse.token = ''
  }

  public isAuthenticated():boolean{
    console.log(sessionStorage.getItem('token'))
    return Boolean(sessionStorage.getItem('token'))
  }
}
