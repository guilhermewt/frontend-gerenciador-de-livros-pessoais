import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { RequestLogin } from 'src/app/resources/models/requestLogin';
import { responseLogin } from 'src/app/resources/models/responseLogin';
import { LoginService } from 'src/app/resources/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public requestLogin!: RequestLogin;
  responseLogin!:responseLogin

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
    this.requestLogin = new RequestLogin();
  }

  doLogin():void{
    this.loginService.doLogin(this.requestLogin).subscribe(
      (data) => {
        this.responseLogin = data;
        console.log(data)
      },
      
    )
    
  }

  testApi():void{
    this.loginService.obterPerfil(this.responseLogin.jwt).subscribe(data => {
      console.log(data)
    })
  }

}
