import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ExceptionsService } from '../../exception/exception-services/exceptions.service';
import { Router } from '@angular/router';
import { user } from '../user-models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDomainService {

  baseUrl = '/api/'

  private httpClient: HttpClient;

  constructor(private handler: HttpBackend,private http:HttpClient,private router:Router,private exception:ExceptionsService) { 
    this.httpClient = new HttpClient(handler);
 }

 
  changePassword(oldPassword:String,newPassword:String):Observable<any>{
    var url = `${this.baseUrl}userDomains/update-password?oldPassword=${oldPassword}&newPassword=${newPassword}`
     return this.http.put<string>(url,oldPassword)
     .pipe(
      map(obj => obj),
      catchError(e => this.exception.defaultBadException('senha invalida')));
  }

  createUserService(user:user):Observable<user>{
    var url = `${this.baseUrl}userDomains/save`
   return  this.httpClient.post<user>(url,user).pipe(
    map(obj => obj),
    catchError(e => this.exception.throwException(e,'Login')));
  }

}
