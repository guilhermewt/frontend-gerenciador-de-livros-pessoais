import { HttpBackend, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from '../models/requestLogin';
import { responseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = '/api/'

  private httpClient: HttpClient;

  constructor( handler: HttpBackend,private http:HttpClient) { 
     this.httpClient = new HttpClient(handler);
  }

  
  public doLogin(requestLogin:RequestLogin):void{
    sessionStorage.removeItem('token')
    this.httpClient.post<responseLogin>(`${this.baseUrl}login`,requestLogin).subscribe(
      (data) => {

        console.log('usuario logado ' + data.token)     
       
        sessionStorage.setItem('token',data.token)      
      });
  }

  obterPerfil():Observable<responseLogin> {
    return this.http.get<any>(`${this.baseUrl}orders`);
  }

}
