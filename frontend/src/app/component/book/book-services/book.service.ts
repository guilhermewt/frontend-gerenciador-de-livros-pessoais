import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ObservedValuesFromArray } from 'rxjs';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { Book } from '../books-model/Book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = '/api/';

  constructor(private http:HttpClient, private exceptions:ExceptionsService) { }

  read():Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/books/all`).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  create(livro:Book):Observable<Book>{
    return this.http.post<Book>(this.baseUrl,livro).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  readById(id:string):Observable<Book>{
    const url = `${this.baseUrl}/books/${id}`;
    return this.http.get<Book>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  findBookByStatus(statusBook:string):Observable<Book[]>{
    const url = `${this.baseUrl}?status=${statusBook}`
    return this.http.get<Book[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }
  
  searchBook(book:string):Observable<Book[]>{
    const url = `${this.baseUrl}/searchBook?name=${book}`
    return this.http.get<Book[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  update(livro:Book):Observable<Book>{
    const url = `${this.baseUrl}/${livro.id}`;
    return this.http.put<Book>(url,livro).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  delete(id:any):Observable<Book>{
    const url = `${this.baseUrl}books/${id}`;
    return this.http.delete<Book>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

}  