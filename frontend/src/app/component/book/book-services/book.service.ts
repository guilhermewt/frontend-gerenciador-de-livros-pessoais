import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ObservedValuesFromArray } from 'rxjs';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { Book, Genrers } from '../books-model/Book.model';

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

  findAllGenrers():Observable<Genrers[]>{
    return this.http.get<Genrers[]>(`${this.baseUrl}genrers/all`).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  create(livro:Book):Observable<Book>{
    return this.http.post<Book>(`${this.baseUrl}books`,livro).pipe(
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
    const url = `${this.baseUrl}books/findbookByStatus?statusBook=${statusBook}`
    return this.http.get<Book[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }
  
  searchBook(title:string):Observable<Book[]>{
    const url = `${this.baseUrl}books/findbytitle?title=${title}`
    return this.http.get<Book[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  findBookByAuthor(author:string):Observable<Book[]>{
    console.log(author)
    const url = `${this.baseUrl}books/find-by-author?author=${author}`
    return this.http.get<Book[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  findBookByGenrer(genrerName:string):Observable<Book[]>{
    console.log(genrerName)
    const url = `${this.baseUrl}books/find-by-genrer?genrer=${genrerName}`
    return this.http.get<Book[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  update(livro:Book):Observable<Book>{
    const url = `${this.baseUrl}books`;
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