import { AuthService } from './../../auth/auth-services/auth.service';
import { CommunicationComponentsService } from './../../book/book-services/communication-components.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { statistics } from './models/statistics.model';
import { BookService } from '../../book/book-services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-book',
  templateUrl: './dashboard-book.component.html',
  styleUrls: ['./dashboard-book.component.css']
})
export class DashboardBookComponent implements OnInit{
 
  bookToReadPercentage:number = 0
  bookReadPercentage:number = 0
  bookReadingPercentage:number = 0
  booksBorrowedPercentage:number = 0

  bookStatistics!:statistics 
 
  strokeDasharray: string = '189';
 
  @ViewChild('bookToReadCircleProgress') bookToReadCircleProgress!: ElementRef;
  @ViewChild('bookReadCircleProgress') bookReadCircleProgress!: ElementRef;
  @ViewChild('bookReadingCircleProgress') bookReadingCircleProgress!: ElementRef;
  @ViewChild('booksBorrowedCircleProgress') booksBorrowedCircleProgress!: ElementRef;

  private subscription!: Subscription;


  constructor(private bookService:BookService,private communicationService:CommunicationComponentsService,private authService:AuthService){

  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.bookService.getBookStatistics().subscribe(data => {
      this.bookStatistics = data
      this.calculatePercentageBook();
      this.defineCircleInTemplate()
   
      })
      this.subscription = this.communicationService.triggerNgOnInit$.subscribe(() => {
      this.ngOnInit();  // Simula o acionamento do ngOnInit novamente
      });
    }
    
  }

  calculatePercentageBook(){
    if (this.bookStatistics.numberOfBooks !== 0) {
      this.bookToReadPercentage = parseFloat(((this.bookStatistics.numberOfBooksToRead / this.bookStatistics.numberOfBooks) * 100).toFixed(1));
    
      this.bookReadPercentage = parseFloat(((this.bookStatistics.numberOfBooksRead / this.bookStatistics.numberOfBooks) * 100).toFixed(1));
     
      this.bookReadingPercentage = parseFloat(((this.bookStatistics.amountBooksReading / this.bookStatistics.numberOfBooks) * 100).toFixed(1));
     
      this.booksBorrowedPercentage =  parseFloat(((this.bookStatistics.numberBooksBorrowed / this.bookStatistics.numberOfBooks) * 100).toFixed(1));
    }else{
      this.bookToReadPercentage = 0
    
      this.bookReadPercentage = 0
     
      this.bookReadingPercentage = 0
     
      this.booksBorrowedPercentage = 0
    }
    
  
  }

  calculateCircleStrokeDashOffSet(percentage:number):number{
    return (189 * (100 - percentage)) / 100;
    
  }
  
  
  defineCircleInTemplate() {
    this.bookToReadCircleProgress.nativeElement.style.strokeDashoffset = this.calculateCircleStrokeDashOffSet(this.bookToReadPercentage)
    this.bookReadCircleProgress.nativeElement.style.strokeDashoffset = this.calculateCircleStrokeDashOffSet(this.bookReadPercentage)
    this.bookReadingCircleProgress.nativeElement.style.strokeDashoffset = this.calculateCircleStrokeDashOffSet(this.bookReadingPercentage)
    this.booksBorrowedCircleProgress.nativeElement.style.strokeDashoffset = this.calculateCircleStrokeDashOffSet(this.booksBorrowedPercentage)
  }
}

/*
updateCircle() {
   // this.percentage = (this.livrosLidos / this.totalLivros) * 100

    const circle = document.querySelector("#circleProgress") as HTMLElement;
    document.querySelector(".number")!.innerHTML = this.percentage + '%';
    circle.style.strokeDashoffset = (440 * (100 - this.percentage)) / 100 + '';
  }
   */
