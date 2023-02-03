import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../../livro/livro.model';
import { LivroService } from '../../livro/livro.service';
import { LoanService } from '../loan-service.service';
import { Loan } from './loan.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan-read.component.html',
  styleUrls: ['./loan-read.component.css']
})
export class LoanComponent implements OnInit{

  constructor(private bookService:LivroService,private router:Router,private activedRouter:ActivatedRoute,private loanService:LoanService){}

  book!:Livro 

  loan:Loan = {
    startOfTheLoan:'20/01/2023',
    endOfTheLoan:'25/01/2023',
    lendBookTo:'agnaldo'
  }

  ngOnInit(): void {
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(book => {
      this.book = book
    })

    // this.loanService.getLoanByBookId(this.book.id!).subscribe(loan => {
    //   this.loan = loan;
    // })
  }

}