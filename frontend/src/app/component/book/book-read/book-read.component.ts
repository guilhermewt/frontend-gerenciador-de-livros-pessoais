import { Component, HostListener, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book-services/book.service';
import { Book} from '../books-model/Book.model';
import { CommunicationComponentsService } from '../book-services/communication-components.service';
import { lastSearch } from '../books-model/lastSearch.model';
import { ViewportScroller } from '@angular/common';
import { identity } from 'rxjs';


@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
export class BookReadComponent implements OnInit{

  image = '#'
  page:number = 1;
  bookFromDataBase!:Book[];
  bookToShow:Book[] = [];
  itemsPerPage:number=27;
  totalItems!:number;
  totalProduct:any;
  lastSearch!:lastSearch

  showScrollButton = false;

  isLoanding:boolean = true;
  isEmpty:boolean = false;

  constructor(private comunicationService:CommunicationComponentsService,private livroService:BookService,
    private router:Router,private viewportScroller: ViewportScroller) { 
      this.comunicationService.getBook().subscribe(books =>{
        this.bookToShow = books.content;
        this.totalItems = books.totalElements;
        if(this.lastSearch != undefined){
          if(books.totalElements > 0){
            this.isLoanding = false
          }
          else{
            this.isEmpty = true;
          }
        }
      })

      this.comunicationService.getPage().subscribe(data => {
        this.page = data
      })

      this.comunicationService.getLastSearch().subscribe(data => {
        this.lastSearch = data
      })
  }

  
  ngOnInit(): void {
    this.livroService.readBookPageable(this.itemsPerPage,this.page - 1).subscribe((book) => {
      this.bookToShow = book.content
      this.totalItems = book.totalElements
      this.lastSearch = new lastSearch(false,false,false,false,true)
      if(book.totalElements > 0){
        this.isLoanding = false
      }
      else{
        this.isEmpty = true;
      }
    
    })
  }
  
  mostrar(page:string):void{
    console.log(page)
  }

  salvar():void{
    this.router.navigate(['/create'])
  }

  editBook():void{
    this.router.navigate(['/updatebook'])
  }

  changeIdBookShow(id:number){
    this.comunicationService.sendnumberToSearchBook(id)
  }
  

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollButton = window.scrollY >= 200; // Exibir o botão quando o scroll for maior que 200px
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  
}
