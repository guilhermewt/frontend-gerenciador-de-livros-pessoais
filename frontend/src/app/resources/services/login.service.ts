import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from '../models/requestLogin';
import { responseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = '/api/'

  constructor(private http:HttpClient) { }

  public doLogin(requestLogin:RequestLogin):void{
    this.http.post<responseLogin>(`${this.baseUrl}login`,requestLogin).subscribe(
      (data) => {
        localStorage.setItem('token',data.token)
        console.log('usuario logado' + data.token)       
      });
  }

  obterPerfil():Observable<responseLogin> {
   return this.http.get<any>(`${this.baseUrl}orders`);
 }

}
