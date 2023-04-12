import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Loan } from './loan-read/loan.model';
import { ExceptionsService } from 'src/app/resources/services/exceptions.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http:HttpClient, private exceptions:ExceptionsService) { }

  baseurl = "http://localhost:8080/loans"

  saveLoan(id:string,loan:Loan):Observable<Loan>{
    const url = `${this.baseurl}/${id}`;
    return this.http.post<Loan>(url,loan).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  getLoanByBookId(id:number):Observable<Loan>{
    const url = `${this.baseurl}/${id}`;
    return this.http.get<Loan>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

}
