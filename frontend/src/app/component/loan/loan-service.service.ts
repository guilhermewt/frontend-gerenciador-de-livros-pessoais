import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from './loan-read/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http:HttpClient) { }

  baseurl = "http://localhost:8080/loans"

  saveLoan(id:string,loan:Loan):Observable<Loan>{
    const url = `${this.baseurl}/${id}`;
    return this.http.post<Loan>(url,loan);
  }

  getLoanByBookId(id:number):Observable<Loan>{
    const url = `${this.baseurl}/${id}`;
    return this.http.get<Loan>(url);
  }

  showMensage(msg:string){
    console.log(msg);
  }
}
