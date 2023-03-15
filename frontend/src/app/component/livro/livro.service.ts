import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl = 'http://localhost:3001/livro';

  constructor(private http:HttpClient) { }

  showMessage(msg:string){
    console.log(msg);
  }

  read():Observable<Livro[]>{
    return this.http.get<Livro[]>(this.baseUrl);
  }

  create(livro:Livro):Observable<Livro>{
    return this.http.post<Livro>(this.baseUrl,livro);
  }

  readById(id:string):Observable<Livro>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Livro>(url);
  }

  findBookByStatus(statusBook:string):Observable<Livro[]>{
    const url = `${this.baseUrl}?status=${statusBook}`
    return this.http.get<Livro[]>(url);
  }
  

  searchBook(book:string):Observable<Livro[]>{
    const url = `${this.baseUrl}/searchBook?name=${book}`
    return this.http.get<Livro[]>(url);
  }

  update(livro:Livro):Observable<Livro>{
    const url = `${this.baseUrl}/${livro.id}`;
    return this.http.put<Livro>(url,livro);
  }

  delete(id:any):Observable<Livro>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Livro>(url);
  }

  showMensage(msg:string){
    console.log(msg);
  }

}  

