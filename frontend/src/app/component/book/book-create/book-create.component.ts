import { BookApi,image } from '../books-model/ObjectApiBook';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book-services/book.service';
import { ItemsBook } from '../books-model/ObjectApiBook';
import { Book } from '../books-model/Book.model';
import { GoogleApiService } from '../book-services/GoogleBookApi.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit{

  image:image = {
    thumbnail: 'http://books.google.com/books/content?id=Pxp9DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  }

  statusBook:string[] = ['Ler','Lido','Lendo','emprestado']

  book:BookApi = {
    status: this.statusBook[0],
    title: '',
    imageLinks: new image,
    authors: [],
    description: ''
  }

  title:string = ''
  description:string = ''
  author:string = ''

  bookSearch!:ItemsBook[]

  constructor(private googleBooksService:GoogleApiService ,private bookService:BookService,private router:Router){
  }

  ngOnInit(): void {
    
  }

  toAuthor():string{ 
    return this.book.authors.join(' & ')
  }

  save():void{
    console.log(new Book(this.book.title,this.book.status,this.toAuthor(),this.book.imageLinks.thumbnail,this.book.description))
    this.bookService.create(new Book(this.book.title,this.book.status,this.toAuthor(),this.book.imageLinks.thumbnail,this.book.description)).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  cancel():void{
    this.router.navigate(['/'])
  }

  searchBookInApi():void{
      this.googleBooksService.getBooksApi(this.book.title).subscribe((data) => {
        for(let x of data.items){
              if(x.volumeInfo.imageLinks == null){
                x.volumeInfo.imageLinks = this.image
              }
        }  
      this.bookSearch =  data.items.filter(x => x.volumeInfo);
       })
  }

  selectBook(id:string):void{  
    const indice:number = this.bookSearch.findIndex((x) => x.id === id) 
    this.book=this.bookSearch[indice].volumeInfo
    this.book.status = this.statusBook[0]
    this.showBook()
  }

  showBook():void{
    this.title = this.book.title
    this.author = this.book.authors[0]
    this.description = this.book.description
  }

}
