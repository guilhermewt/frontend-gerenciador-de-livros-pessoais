import { CommunicationComponentsService } from './../book-services/communication-components.service';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book-services/book.service';
import { Router } from '@angular/router';
import { BookReadComponent } from '../book-read/book-read.component';
import { Genrers } from '../books-model/Book.model';
import { lastSearch } from '../books-model/lastSearch.model';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit{

  statusBook:string[] = ['TODOS','LIDO','LER','LENDO','EMPRESTADO']
  statusToFilter:string = this.statusBook[0]

  authorSearch:string = ''

  genrersFromApi!:Genrers[]

  genrerToSearch!:Genrers

  constructor(private communicationService:CommunicationComponentsService,private bookRead:BookReadComponent, private livroService:BookService,
    private router:Router) { }
  
  ngOnInit(): void {
      this.livroService.findAllGenrers().subscribe((data) =>{
        this.genrersFromApi = data
        this.genrerToSearch = this.genrersFromApi[0]
      })
  }

  changeLoadingOrEmpty(data:any):void{
    if(data.totalElements > 0){
      this.bookRead.isLoanding = false;
    }
    else{
      this.bookRead.isEmpty = true;
    }
  }

  salvar():void{
    this.router.navigate(['/create'])
  }

  filter():void{

    this.bookRead.lastSearch = new lastSearch(false,false,false,true,false)

    this.defaultPagination();

    this.communicationService.sendStatusPage(this.statusToFilter)

    if(this.statusToFilter == this.statusBook[0]){
      this.livroService.readBookPageable(this.bookRead.itemsPerPage,0).subscribe((data) => {
        this.bookRead.bookToShow = data.content;
        this.bookRead.totalItems = data.totalElements;
        this.changeLoadingOrEmpty(data)
      })
     
    }
    else{
      this.livroService.findBookByStatus(this.statusToFilter,this.bookRead.itemsPerPage,0).subscribe((books) => {
        this.bookRead.bookToShow = books.content;
        this.bookRead.totalItems = books.totalElements;
        this.changeLoadingOrEmpty(books)
       
      })
    }

  }

  filterByAuthor():void{
  
    this.bookRead.lastSearch = new lastSearch(false,false,true,false,false)
    
    this.defaultPagination()
      
    this.livroService.findBookByAuthor(this.authorSearch,this.bookRead.itemsPerPage,0).subscribe((books) => {
        this.bookRead.bookToShow = books.content;
        this.bookRead.totalItems = books.totalElements;
        this.changeLoadingOrEmpty(books)
      })
  }

  filterByGenrer():void{
  
    this.bookRead.lastSearch = new lastSearch(false,true,false,false,false)

    this.defaultPagination()
    
    this.livroService.findBookByGenrer(this.genrerToSearch.name,this.bookRead.itemsPerPage,0).subscribe((books) => {
      this.bookRead.bookToShow = books.content;
      this.bookRead.totalItems = books.totalElements;
      this.changeLoadingOrEmpty(books)
    })
  }

  defaultPagination():void{
    this.bookRead.page = 1
  } 

}
