import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ObservedValuesFromArray } from 'rxjs';
import { ExceptionsService } from 'src/app/resources/services/exceptions.service';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl = 'http://localhost:3001/livro';

  constructor(private http:HttpClient, private exceptions:ExceptionsService) { }

  read():Observable<Livro[]>{
    return this.http.get<Livro[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  create(livro:Livro):Observable<Livro>{
    return this.http.post<Livro>(this.baseUrl,livro).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  readById(id:string):Observable<Livro>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Livro>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  findBookByStatus(statusBook:string):Observable<Livro[]>{
    const url = `${this.baseUrl}?status=${statusBook}`
    return this.http.get<Livro[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }
  
  searchBook(book:string):Observable<Livro[]>{
    const url = `${this.baseUrl}/searchBook?name=${book}`
    return this.http.get<Livro[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  update(livro:Livro):Observable<Livro>{
    const url = `${this.baseUrl}/${livro.id}`;
    return this.http.put<Livro>(url,livro).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

  delete(id:any):Observable<Livro>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Livro>(url).pipe(
      map(obj => obj),
      catchError(e => this.exceptions.defaultBadException(''))
    );
  }

}  