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
}
