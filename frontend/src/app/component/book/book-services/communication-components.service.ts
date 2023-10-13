import { BookFilterComponent } from './../book-filter/book-filter.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../books-model/Book.model';
import { lastSearch } from '../books-model/lastSearch.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationComponentsService {

  constructor() { }

  private bookSubject = new BehaviorSubject<any>([]);
  private statusPage = new BehaviorSubject<any>([]);
  private title = new BehaviorSubject<any>([]);
  private page = new BehaviorSubject<number>(1);
  private lastSearch = new BehaviorSubject<lastSearch>(new lastSearch(false,false,false,false,false));
  private numberToSearchBook = new BehaviorSubject<number>(-1);

  private triggerNgOnInitSource = new Subject<void>();
  triggerNgOnInit$ = this.triggerNgOnInitSource.asObservable();

  private triggerClearMemoryObjectsSource = new Subject<void>();
  clearMemoryObjects$ = this.triggerClearMemoryObjectsSource.asObservable();

  triggerNgOnInit() {
    this.triggerNgOnInitSource.next();
  }

  triggerClearMemory() {
    this.triggerClearMemoryObjectsSource.next();
  }

  getBook() {
    return this.bookSubject.asObservable();
  }

  sendBook(message: Book[]) {
    this.bookSubject.next(message);
  }

  sendStatusPage(message: string) {
    this.statusPage.next(message);
  }

  getStatusPage() {
    return this.statusPage.asObservable();
  }

  sendTitleToSearch(message: string) {
    this.title.next(message);
  }

  getTitleTosearch() {
    return this.title.asObservable();
  }

  sendPage(message: number) {
    this.page.next(message);
  }

  getPage() {
    return this.page.asObservable();
  }

  sendLastSearch(message: lastSearch) {
    this.lastSearch.next(message);
  }

  getLastSearch() {
    return this.lastSearch.asObservable();
  }

  getnumberToSearchBook() {
    return this.numberToSearchBook.asObservable();
  }

  sendnumberToSearchBook(message:number) {
    this.numberToSearchBook.next(message);
  }

  filterStatus():void{
    //this.bookFilter.filterByStatusWithPageable
  }
}
