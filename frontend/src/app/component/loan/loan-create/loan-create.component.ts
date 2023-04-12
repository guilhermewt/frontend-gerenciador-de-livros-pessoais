import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExceptionsService } from 'src/app/resources/services/exceptions.service';
import { Livro } from '../../livro/livro.model';
import { LivroService } from '../../livro/livro.service';
import { Loan } from '../loan-read/loan.model';
import { LoanService } from '../loan-service.service';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.css']
})
export class LoanCreateComponent implements OnInit{
 
  constructor(private bookService:LivroService,private router:Router,private activedRouter:ActivatedRoute,
    private loanService:LoanService, private exceptions:ExceptionsService){}

  book!:Livro 

  loan:Loan = {
    startOfTheLoan:'',
    endOfTheLoan:'',
    lendBookTo:''
  }

  ngOnInit(): void {
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(book => {
      this.book = book
      console.log(book)
    })
  }

  saveLoan():void{
    const id = this.activedRouter.snapshot.paramMap.get('idBook');
    this.loanService.saveLoan(id!,this.loan).subscribe(() => {
      this.exceptions.showMensage('livro emprestado','operacao bem sucedida!','toast-sucess')
      this.router.navigate(['/'])
    })
  }
  
  cancel():void{
    this.router.navigate(['/'])
  }
}
