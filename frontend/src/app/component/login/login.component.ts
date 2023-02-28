import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { RequestLogin } from 'src/app/resources/models/requestLogin';
import { LoginService } from 'src/app/resources/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public requestLogin!: RequestLogin;

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
    this.requestLogin = new RequestLogin();
  }

  doLogin():void{
    this.loginService.doLogin(this.requestLogin).subscribe(
      (data) => {
        console.log(data)
      }
    )
     
    
    
  }

}
