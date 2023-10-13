import { CommunicationComponentsService } from './../book-services/communication-components.service';
import { DashboardBookComponent } from './../../dashboards/dashboard-book/dashboard-book.component';
import { BookApi,image } from '../books-model/ObjectApiBook';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book-services/book.service';
import { ItemsBook } from '../books-model/ObjectApiBook';
import { Book, Genrers } from '../books-model/Book.model';
import { GoogleApiService } from '../book-services/GoogleBookApi.service';
import { ExceptionsService } from '../../exception/exception-services/exceptions.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit{

  image:image = {
    thumbnail: '#'
  }

  statusBook:string[] = ['LER','LIDO','LENDO']

  book:BookApi = {
    status: this.statusBook[0],
    title: '',
    imageLinks: new image,
    authors: [],
    description: ''
  }

  bookSearch!:ItemsBook[]

  genrersFromApi!:Genrers[]

  bookToApi:Book = {
    title: '',
    authors: '',
    description: '',
    imageLink: '',
    genrers: [],
    id: 1,
    statusBook: this.statusBook[0]
  }

  public numWords: number = 0;

  showBook:Boolean = false;


  submitted = false;

  constructor(private googleBooksService:GoogleApiService ,private bookService:BookService
    ,private router:Router,private exception:ExceptionsService,private communicationService:CommunicationComponentsService){
      
  }

  ngOnInit(): void {
    this.bookService.findAllGenrers().subscribe((data) =>{
      this.genrersFromApi = data
      this.bookToApi.genrers[0] = this.genrersFromApi[0]
    })
  }

  save():void{
    this.submitted = true;
    if(this.bookToApi.title == ''){
      this.exception.showMensage('Preencha o campo titulo','','toast-error')
    }
    else{
        this.bookService.create(this.bookToApi).subscribe(() => {
          this.communicationService.triggerNgOnInit();
          this.router.navigate(['/home'])
        })
    }
  }

  cancel():void{
    this.router.navigate(['/home'])
  }

  searchBookInApi():void{
      this.cleanForm();

      this.googleBooksService.getBooksApi(this.bookToApi.title).subscribe((data) => {
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
    this.bookToApi.title = this.bookSearch[indice].volumeInfo.title
    this.bookToApi.imageLink = this.bookSearch[indice].volumeInfo.imageLinks.thumbnail
    this.bookToApi.authors = this.bookSearch[indice].volumeInfo.authors.join(' & ')
    
    this.configDescription(indice);
    this.showBook = true;
  }

  configDescription(indice:number):void{
    
    if(this.bookSearch[indice].volumeInfo.description != undefined){
      this.bookToApi.description =  this.bookSearch[indice].volumeInfo.description.slice(0, 243);
      this.bookToApi.description += ' etc...'
    }
    else{
      this.bookToApi.description =  this.bookSearch[indice].volumeInfo.description
    }

    if(this.bookToApi.description == undefined){
      this.numWords = 0
    }
    else{
      this.numWords = this.bookToApi.description.length
    }
    
  }

  countWords():void{
    this.numWords = this.bookToApi.description.length;
  }

  cleanForm():void{
    this.bookToApi.authors = ''
    this.bookToApi.description = ''
    this.bookSearch = []
  }

}
