import { HttpBackend, HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,EMPTY,map,catchError } from 'rxjs';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';
import { tap } from 'rxjs/operators';
import { RequestLogin } from '../models/requestLogin';
import { responseLogin } from '../models/responseLogin';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = '/api/'

  private httpClient: HttpClient;

  constructor( handler: HttpBackend,private http:HttpClient,private authService:AuthService,private router:Router) { 
     this.httpClient = new HttpClient(handler);
  }

  
  public doLogin(requestLogin:RequestLogin):void{
    this.httpClient.post<responseLogin>(`${this.baseUrl}login`,requestLogin)
    .pipe(
      tap((loginResponse) =>    
            this.authService.loginResponse = loginResponse      
      ))
      .subscribe(data => {
        sessionStorage.setItem('token',data.token)
      })

  }

  obterPerfil():Observable<responseLogin> {
    return this.http.get<any>(`${this.baseUrl}orders`).pipe(
      map(obj => obj),
        catchError(e => this.errorHandler(e)) 
    );
  }

  errorHandler(e:HttpErrorResponse): Observable<any>{
    if(e.status == 403 || 500){
      console.log('ocorreu um error na operacao','error!','token invalido! faça o login novamente')
      this.router.navigate(['/login'])
      return EMPTY
    }
    return EMPTY
  }
}