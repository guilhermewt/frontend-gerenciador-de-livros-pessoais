import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { Book } from '../../book/books-model/Book.model';
import { BookService } from '../../book/book-services/book.service';
import { Loan } from '../loan.model';
import { LoanService } from '../loan-service/loan-service.service';
import { LoanComponent } from '../loan-read/loan-read.component';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.css']
})
export class LoanCreateComponent implements OnInit{
 
  constructor(private loanRead:LoanComponent,private bookService:BookService,private router:Router,private activedRouter:ActivatedRoute,
    private loanService:LoanService, private exceptions:ExceptionsService){}

  book!:Book

  loan:Loan = {
    startOfTheLoan:'',
    endOfLoan:'',
    lendBookTo:'',
    bookId: ''
  }

  ngOnInit(): void {
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(book => {
      this.book = book
    })
  }

  saveLoan():void{
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.loan.bookId = this.book.id
    this.loanService.saveLoan(id!,this.loan).subscribe(() => {
      this.exceptions.showMensage('livro emprestado','operacao bem sucedida!','toast-sucess')
      this.loanRead.ngOnInit()
       this.router.navigate(['/loan/' + this.book.id])
    })
  }
  
  cancel():void{
    this.router.navigate(['/'])
  }
}
