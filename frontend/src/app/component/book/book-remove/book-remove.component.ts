import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../books-model/Book.model'; 
import { BookService } from '../book-services/book.service';

@Component({
  selector: 'app-book-remove',
  templateUrl: './book-remove.component.html',
  styleUrls: ['./book-remove.component.css']
})
export class BookRemoveComponent implements OnInit{

  book!:Book
  constructor(private bookService:BookService,private router:Router,private activeRouter:ActivatedRoute){}

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(book => {
      this.book = book;
    })
  }

  deleteBook():void{
    this.bookService.delete(this.book.id!).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

  cancel(): void{
    this.router.navigate(['/home'])
  }

}
