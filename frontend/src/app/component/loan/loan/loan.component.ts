import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../../livro/livro.model';
import { LivroService } from '../../livro/livro.service';
import { Loan } from './loan.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit{

  constructor(private bookService:LivroService,private router:Router,private activedRouter:ActivatedRoute){}

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
      console.log(book)
      console.log(this.loan)
    })
  }

  saveLoan():void{

  }

  cancel():void{

  }
}
