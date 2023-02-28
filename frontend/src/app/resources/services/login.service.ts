import { HttpClient, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { TokenType } from '@angular/compiler';
import { Injectable, NgProbeToken, ProviderToken } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from '../models/requestLogin';
import { responseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = '/api/login'

  constructor(private http:HttpClient) { }

  public  doLogin(requestLogin:RequestLogin):Observable<RequestLogin>{
    console.log(requestLogin)
    return this.http.post<RequestLogin>(this.baseUrl,requestLogin)
  }

}
