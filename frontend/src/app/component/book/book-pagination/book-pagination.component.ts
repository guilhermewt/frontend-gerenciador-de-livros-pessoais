import { CommunicationComponentsService } from './../book-services/communication-components.service';
import { BookReadComponent } from './../book-read/book-read.component';
import { BookFilterComponent } from './../book-filter/book-filter.component';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book-services/book.service';

@Component({
  selector: 'app-book-pagination',
  templateUrl: './book-pagination.component.html',
  styleUrls: ['./book-pagination.component.css']
})
export class BookPaginationComponent implements OnInit{
  
  statusPage!:string
  titleToSearch!:string

  constructor(private bookFilter:BookFilterComponent,private bookRead:BookReadComponent
    ,private livroService:BookService,private communicationService:CommunicationComponentsService){
      this.communicationService.getStatusPage().subscribe(data => {
        this.statusPage = data
      })

      this.communicationService.getTitleTosearch().subscribe(data => {
        this.titleToSearch = data
      })
  }

  ngOnInit(): void {
    
  }

  pageChanged(page: number) {
    this.bookRead.page = page
     
    if(this.bookRead.lastSearch.lastAllSearch){
      this.bookRead.ngOnInit()
    }
    if(this.bookRead.lastSearch.lastAuthorSearch){
      this.filterByAuthorWithPageable()
    }
    if(this.bookRead.lastSearch.lastGenrerSearch){
      this.filterByGenrerWithPageable()
    }
    if(this.bookRead.lastSearch.lastStatusSearch){
      this.filterByStatusWithPageable()
    }

    if(this.bookRead.lastSearch.lastTitleSearch){
      this.filterByTitleWithPageable()
    }
  }

  filterByGenrerWithPageable():void{
    this.livroService.findBookByGenrer(this.bookFilter.genrerToSearch.name,this.bookRead.itemsPerPage,this.bookRead.page).subscribe((books) => {
      this.bookRead.bookToShow = books.content;

    })
  }

  filterByStatusWithPageable():void{
   
      if(this.statusPage == this.bookFilter.statusBook[0]){
        this.livroService.readBookPageable(this.bookRead.itemsPerPage,this.bookRead.page - 1).subscribe((data) => {
          this.bookRead.bookToShow = data.content;
        })
      
      }
      else{
        this.livroService.findBookByStatus(this.statusPage,this.bookRead.itemsPerPage,this.bookRead.page - 1).subscribe((books) => {
          this.bookRead.bookToShow = books.content;
        })
      }

  }

  filterByAuthorWithPageable():void{

    this.livroService.findBookByAuthor(this.bookFilter.authorSearch,this.bookRead.itemsPerPage,this.bookRead.page).subscribe((books) => {
      this.bookRead.bookToShow = books.content;
    })
  }

  filterByTitleWithPageable():void{

    this.livroService.searchBook(this.titleToSearch,this.bookRead.itemsPerPage,this.bookRead.page - 1).subscribe((books) => {
      this.bookRead.bookToShow = books.content;
    })

  }

}
