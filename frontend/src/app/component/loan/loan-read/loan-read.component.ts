import { ExceptionsService } from './../../exception/exception-services/exceptions.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../book/books-model/Book.model';
import { BookService } from '../../book/book-services/book.service';
import { LoanService } from '../loan-service/loan-service.service';
import { Loan } from '../loan.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan-read.component.html',
  styleUrls: ['./loan-read.component.css']
})
export class LoanComponent implements OnInit{

  constructor(private bookService:BookService,private router:Router,private activedRouter:ActivatedRoute,private loanService:LoanService,
  private exception:ExceptionsService){}

  book!:Book

  loan:Loan = {
    bookId:'',
    startOfTheLoan:'',
    endOfLoan:'',
    addressee:''
  }

  statusBook:string[] = ['LER','LIDO','LENDO']

  statusToUpdateBook:string = this.statusBook[0]

  ngOnInit(): void {
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(book => {
      this.book = book
      this.getLoan(id!);
    })
  }

  getLoan(id:string):void{
    if(this.book.statusBook == 'EMPRESTADO'){
      this.loanService.getLoanByBookId(this.book.id!).subscribe(loan => {
        this.loan = loan;
      })
      
    }

  }

  deleteLoan():void{
    this.updateBook()
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.loanService.deleteLoan(id).subscribe(data => {
      this.exception.showMensage('emprestimo apagado','operação bem sucedida','')
      this.ngOnInit()
    })
  }

  updateBook():void{
    this.book.statusBook = this.statusToUpdateBook
    this.bookService.update(this.book).subscribe(() => {
      
    })
  }

}