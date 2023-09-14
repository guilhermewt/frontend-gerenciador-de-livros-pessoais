import { Component } from '@angular/core';
import { Book } from '../books-model/Book.model';
import { BookService } from '../book-services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookReadComponent } from '../book-read/book-read.component';
import { CommunicationComponentsService } from '../book-services/communication-components.service';

@Component({
  selector: 'app-book-show',
  templateUrl: './book-show.component.html',
  styleUrls: ['./book-show.component.css']
})
export class BookShowComponent {

  book!:Book
  bookToSearch!:number
  constructor(private communicationService:CommunicationComponentsService,private bookRead:BookReadComponent,private bookService:BookService,private router:Router,private activeRouter:ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.book
    this.communicationService.getnumberToSearchBook().subscribe(data => {
      if(data != -1){
          this.bookService.readById(data.toString()).subscribe(book => {
            this.book = book;
          })
      }
    })
    
    
  }

  removeMemoryBook():void{
    this.communicationService.sendnumberToSearchBook(-1)
  }

  cancel(): void{
    // this.router.navigate(['/home'])
  }
}
