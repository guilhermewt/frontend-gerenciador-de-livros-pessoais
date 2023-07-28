import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookApi, ItemsBook, ObjectApiBook, image } from '../books-model/ObjectApiBook';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  private httpClient: HttpClient;

  image:image = {
    thumbnail: 'http://books.google.com/books/content?id=Pxp9DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  }

  constructor(private handler: HttpBackend,private http:HttpClient) { 
    this.httpClient = new HttpClient(handler);
  }
  
  
  getBooksApi(title:string):Observable<ObjectApiBook>{
    return this.httpClient.get<ObjectApiBook>(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyBDvqlrmSgJEQ5NUQE_3qOwPuhlDZoorMk`) 
  }
}
