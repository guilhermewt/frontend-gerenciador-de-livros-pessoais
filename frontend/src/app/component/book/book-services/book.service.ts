import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ObservedValuesFromArray } from 'rxjs';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { Book, Genrers } from '../books-model/Book.model';
import { statistics } from '../../dashboards/dashboard-book/models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = '/api/';

  constructor(private http:HttpClient, private exceptions:ExceptionsService) { }

  getBookStatistics():Observable<statistics>{
    const url = `${this.baseUrl}/books/get-books-statistics`;
    return this.http.get<statistics>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  read():Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/books/all`).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  readBookPageable(size:number,page:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/books?size=${size}&page=${page}`).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  findAllGenrers():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}genrers/all`).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  create(livro:Book):Observable<Book>{
    return this.http.post<Book>(`${this.baseUrl}books`,livro).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.throwException(e,'Livro'))
    );
  }

  readById(id:string):Observable<Book>{
    const url = `${this.baseUrl}/books/${id}`;
    return this.http.get<Book>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  findBookByStatus(statusBook:string,size:number,page:number):Observable<any>{
    const url = `${this.baseUrl}books/find-by-Status?statusBook=${statusBook}&page=${page}&size=${size}`
    return this.http.get<any>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }
  
  searchBook(title:string,size:number,page:number):Observable<any>{
    const url = `${this.baseUrl}books/find-by-title?title=${title}&size=${size}&page=${page}`
    return this.http.get<any>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  findBookByAuthor(author:string,size:number,page:number):Observable<any>{
    const url = `${this.baseUrl}books/find-by-author?author=${author}&page=${page}&size=${size}`
    return this.http.get<any>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  findBookByGenrer(genrerName:string,size:number,page:number):Observable<any>{
    const url = `${this.baseUrl}books/find-by-genrer?genrer=${genrerName}&page${page}&size=${size}`
    return this.http.get<any>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  update(livro:Book):Observable<Book>{
    const url = `${this.baseUrl}books`;
    return this.http.put<Book>(url,livro).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.throwException(e,'Livro'))
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
