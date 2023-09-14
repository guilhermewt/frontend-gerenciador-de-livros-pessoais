import { AuthService } from 'src/app/component/auth/auth-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { RequestLogin } from 'src/app/component/login/login-models/requestLogin.model';
import { responseLogin } from 'src/app/component/login/login-models/responseLogin.model';
import { LoginService } from 'src/app/component/login/login-services/login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public requestLogin!: RequestLogin;

  constructor(private loginService:LoginService,private router:Router,private authService:AuthService){}

  ngOnInit(): void {
    this.authService.clear()
    this.requestLogin = new RequestLogin();
  }

  doLogin():void{
    this.loginService.doLogin(this.requestLogin);
  }

 
  loginFree(){
    this.requestLogin.username = 'El Tripaseca'
    this.requestLogin.password = 'chapolin123'
    this.doLogin()
  }

}
