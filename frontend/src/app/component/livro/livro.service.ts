import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl = 'http://localhost:3001/livro';

  constructor(private http:HttpClient) { }

  showMessage(msg:string){
    console.log(msg)
  }

  read():Observable<Livro[]>{
    return this.http.get<Livro[]>(this.baseUrl);
  }
}
