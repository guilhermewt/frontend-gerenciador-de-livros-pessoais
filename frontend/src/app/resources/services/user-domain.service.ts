import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ExceptionsService } from './exceptions.service';
import { Router } from '@angular/router';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDomainService {

  baseUrl = '/api/'
  private httpClient: HttpClient;

  constructor(private handler: HttpBackend,private http:HttpClient,private exception:ExceptionsService,private route:Router) { 
    this.httpClient = new HttpClient(handler);
  }

  changePassword(oldPassword:String):Observable<any>{
    var url = `${this.baseUrl}/change/password`
     return this.http.post<string>(url,oldPassword)
     .pipe(
      map(obj => obj),
      catchError(e => this.exception.wrongPassword(e)));
  }

  createUserService(user:user):Observable<user>{
    var url = `${this.baseUrl}userdomains/saveuserdomain`
   return  this.http.post<user>(url,user);
  }


}
