import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { Book } from '../../book/books-model/Book.model';
import { BookService } from '../../book/book-services/book.service';
import { Loan } from '../loan.model';
import { LoanService } from '../loan-service/loan-service.service';
import { LoanComponent } from '../loan-read/loan-read.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationComponentsService } from '../../book/book-services/communication-components.service';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.css']
})
export class LoanCreateComponent implements OnInit{
 
   book!:Book

  loan:Loan = {
    startOfTheLoan:'',
    endOfLoan:'',
    addressee:'',
    bookId: ''
  }

  loanForm: FormGroup;
  submitted = false;

  @ViewChild('button') button!: ElementRef;

  constructor(private loanRead:LoanComponent,private bookService:BookService,private router:Router,private activedRouter:ActivatedRoute,
    private loanService:LoanService, private exceptions:ExceptionsService,private formBuilder: FormBuilder,private communicationService:CommunicationComponentsService){
      this.loanForm = this.formBuilder.group({
        startOfTheLoan:['',[Validators.required]],
        endOfLoan: ['', [Validators.required]],
        addressee: ['', [Validators.required]]
        
      });
    }


  ngOnInit(): void {
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(book => {
      this.book = book
    })
  }

  submitForm() {
    if (this.loanForm.valid) {
      this.loan.startOfTheLoan = this.loanForm.value.startOfTheLoan;
      this.loan.endOfLoan = this.loanForm.value.endOfLoan;
      this.loan.addressee = this.loanForm.value.addressee;

      this.saveLoan();
      this.button.nativeElement.click();

    } else {
     this.submitted = true
     this.exceptions.showMensage('Preencha todos os campos','','toast-error')
    }
  }


  saveLoan():void{
    const id = this.activedRouter.snapshot.paramMap.get('id');
    this.loan.bookId = this.book.id
    this.loanService.saveLoan(id!,this.loan).subscribe(() => {
      this.exceptions.showMensage('livro emprestado','operacao bem sucedida!','toast-sucess')
      this.loanRead.ngOnInit()
       this.router.navigate(['/loan/' + this.book.id])
       this.communicationService.triggerNgOnInit();
    })
  }
  
  cancel():void{
    this.router.navigate(['/home'])
  }
}
