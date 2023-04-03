import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ExceptionsService } from './exceptions.service';

@Injectable({
  providedIn: 'root'
})
export class UserDomainService {

  baseUrl = '/api/'

  constructor(private http:HttpClient,private exception:ExceptionsService) { }

  changePassword(oldPassword:String):Observable<any>{
    var url = `${this.baseUrl}/change/password`
    return this.http.post<string>(url,oldPassword).pipe(
      map(obj => obj),
      catchError(e => this.exception.wrongPassword(e))
    );
  }
}
