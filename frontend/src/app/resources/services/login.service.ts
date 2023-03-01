import { HttpClient, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { TokenType } from '@angular/compiler';
import { Injectable, NgProbeToken, ProviderToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/component/login/login.component';
import { RequestLogin } from '../models/requestLogin';
import { responseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = '/api/'

  constructor(private http:HttpClient) { }

  public  doLogin(requestLogin:RequestLogin):Observable<any>{
    console.log(requestLogin)
    return this.http.post<any>(`${this.baseUrl}login`,requestLogin)
  }

  obterPerfil(jwt:string):Observable<any> {
    const httpOptions = {
     headers: new HttpHeaders({
       Authorization: `Bearer ${jwt}`
     })
   };

   return this.http.get<any>(`${this.baseUrl}api/usuario/listarTodos`, httpOptions);
 }

}
