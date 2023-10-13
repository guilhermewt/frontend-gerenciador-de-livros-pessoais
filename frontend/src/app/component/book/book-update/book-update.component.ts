import { CommunicationComponentsService } from './../book-services/communication-components.service';
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

  constructor(private bookService:BookService,private activeRouter:ActivatedRoute,private router:Router,private exceptions:ExceptionsService,private communicationService:CommunicationComponentsService){}

  book!:Book
  statusBook:string[] = ['LIDO','LER','LENDO'];
  genrers!:Genrers[]

  submitted = false;

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
    this.submitted = true;
    if(this.book.title == ''){
      this.exceptions.showMensage('Preencha o campo titulo','','toast-error')
    }
    else{
      this.bookService.update(this.book).subscribe(() => {
        this.exceptions.showMensage('produto atualizado','operação bem sucedida!','toast-success')
        this.router.navigate(['/home'])
        this.communicationService.triggerNgOnInit();
      })
    }
  }

  cancel():void{
    this.router.navigate(['/home'])
  }
}