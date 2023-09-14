import { CommunicationComponentsService } from './../book-services/communication-components.service';
import { Component } from '@angular/core';
import { BookReadComponent } from '../book-read/book-read.component';
import { BookService } from '../book-services/book.service';
import { Router } from '@angular/router';
import { lastSearch } from '../books-model/lastSearch.model';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent {
  
  constructor(private comunicationService:CommunicationComponentsService,private bookRead:BookReadComponent ,private livroService:BookService,private router:Router,
    ) { }

    search(e:Event):void{
      const target = e.target as HTMLInputElement
      const value = target.value

      this.comunicationService.sendPage(0)
      this.comunicationService.sendLastSearch(new lastSearch(true,false,false,false,false))
  
      this.livroService.searchBook(value,this.bookRead.itemsPerPage,0).subscribe((books) => {
        this.comunicationService.sendBook(books)
      })
    }
  
}
