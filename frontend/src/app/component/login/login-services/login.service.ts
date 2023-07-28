import { HttpBackend, HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,EMPTY,map,catchError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestLogin } from '../login-models/requestLogin.model';
import { responseLogin } from '../login-models/responseLogin.model';
import { AuthService } from '../../auth/auth-services/auth.service';
import { ExceptionsService } from '../../exception/exception-services/exceptions.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = '/api/'

  private httpClient: HttpClient;

  constructor(private handler: HttpBackend,private http:HttpClient,private authService:AuthService,private router:Router,private exceptions:ExceptionsService) { 
     this.httpClient = new HttpClient(handler);
  }
 
  public doLogin(requestLogin:RequestLogin):void{
    console.log(requestLogin)
    this.httpClient.post<responseLogin>(`${this.baseUrl}login`,requestLogin)
    .pipe(
      tap((loginResponse) => this.authService.loginResponse = loginResponse),
      map(obj => obj),
      catchError(e => this.exceptions.userNotFound(e)))
    .subscribe(data => {
        sessionStorage.setItem('token',data.token)
        this.router.navigate([''])
      })
  }

  obterPerfil():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}orders`).pipe(
      map(obj => obj),
        catchError(e => this.exceptions.throwException(e)) 
    );
  }

}