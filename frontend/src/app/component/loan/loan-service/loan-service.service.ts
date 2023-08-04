import { BookService } from './../../book/book-services/book.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Loan } from '../loan.model';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { Book } from '../../book/books-model/Book.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  book!:Book


  constructor(private http:HttpClient, private exceptions:ExceptionsService,private bookService: BookService) { }

  baseurl = "/api/"

  saveLoan(id:string,loan:Loan):Observable<Loan>{
    console.log(id)
    // this.updateBook(id)
    const url = `${this.baseurl}loans/${id}`;
    return this.http.post<Loan>(url,loan).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(e))
    );
  }

  getLoanByBookId(id:number):Observable<Loan>{
    const url = `${this.baseurl}loans/${id}`;
    return this.http.get<Loan>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  testGetLoanByBookId(bookId:string):Observable<Loan[]>{
    const url = `${this.baseurl}?bookId=${bookId}`;
    return this.http.get<Loan[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  updateBook(id:string):void{
    console.log(id)
    //buscar livro para atualizar
    this.bookService.readById(id!).subscribe(book => {
        this.book = book
        this.book.statusBook = 'emprestado'
        this.bookService.update(this.book).subscribe(() => {})
        console.log(this.book)
      })

  }

}
