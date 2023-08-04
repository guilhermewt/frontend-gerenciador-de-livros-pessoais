import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { Book, Genrers } from '../books-model/Book.model'; 
import { BookService } from '../book-services/book.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit{

  constructor(private bookService:BookService,private activeRouter:ActivatedRoute,private router:Router,private exceptions:ExceptionsService){}

  book!:Book
  statusBook:string[] = ['LIDO','LER','LENDO','EMPRESTADO'];
  genrers!:Genrers[]

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(book => {
      this.book = book;
    })
    this.bookService.findAllGenrers().subscribe((data) =>{
      this.genrers = data
    })
  }

  update():void{
    console.log(this.book)
    this.bookService.update(this.book).subscribe(() => {
      this.exceptions.showMensage('produto atualizado','operação bem sucedida!','toast-sucess')
      this.router.navigate([''])
    })
  }

  cancel():void{
    this.router.navigate([''])
  }
}