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

  constructor(private bookService:BookService,private router:Router,private activedRouter:ActivatedRoute,private loanService:LoanService){}

  book!:Book

  loan:Loan = {
    bookId:'',
    startOfTheLoan:'',
    endOfLoan:'',
    lendBookTo:''
  }

  ngOnInit(): void {
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(book => {
      this.book = book
      this.getLoan(id!);
    })
  }

  getLoan(id:string):void{
    if(this.book.statusBook == 'emprestado'){
      this.loanService.getLoanByBookId(this.book.id!).subscribe(loan => {
        this.loan = loan;
      })
      
    }

  }

}