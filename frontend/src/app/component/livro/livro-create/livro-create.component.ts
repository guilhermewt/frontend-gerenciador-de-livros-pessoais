import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro, image } from '../livro.model';
import { LivroService } from '../livro.service';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { items } from 'src/app/resources/models/items';
import { Observable } from 'rxjs';
import { apiBooksObject } from 'src/app/resources/models/apiBooksObject';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit{
  
  livro:Livro = {
    authors: '',
    status: '',
    title: '',
    imageLinks: new image
  }

  image:image = {
    thumbnail: 'http://books.google.com/books/content?id=Pxp9DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  }

  livroSearch!:items[]

  author!:string

   statusBook:string[] = ['lido','ler','lendo']

   private httpClient: HttpClient;

  constructor(private livroService:LivroService,private router:Router,private handler: HttpBackend,private http:HttpClient){
    this.httpClient = new HttpClient(handler);
  }

  ngOnInit(): void {
    
  }

  salvar():void{
    this.livroService.create(this.livro).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  cancelar():void{
    this.router.navigate(['/'])
  }

  livroApi():void{
   image:image
    this.buscarLivro().subscribe((data) => {
      for(var i = 0; i < data.items.length; i++){
            if(data.items[i].volumeInfo.imageLinks == null){
              data.items[i].volumeInfo.imageLinks = this.image
            }
         }

         console.log(data.items)

      this.livroSearch = data.items.filter(x => x.volumeInfo)
      console.log(this.livroSearch[1].volumeInfo.title)
      
      
     })

    // this.httpClient.get<any>("http://localhost:3001/livro").subscribe(data => console.log(data))
  }
  buscarLivro():Observable<apiBooksObject>{
    return this.httpClient.get<apiBooksObject>(`https://www.googleapis.com/books/v1/volumes?q=${this.livro.title}&key=AIzaSyBDvqlrmSgJEQ5NUQE_3qOwPuhlDZoorMk`) 
  }

  definirBook(id:string):void{
   
    const indice:number = this.livroSearch.findIndex((x) => x.id === id) 
    console.log(indice)

    this.livro= this.livroSearch[indice].volumeInfo
    
 
  }

  //estamos pegando o id do livro e vendo em qual indice esta e com base neste indice definimos o nosso livro

}
