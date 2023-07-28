import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/component/login/login-services/login.service';
import { BookService } from '../book-services/book.service';
import { AuthService } from 'src/app/component/auth/auth-services/auth.service';
import { Book } from '../books-model/Book.model';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
export class BookReadComponent implements OnInit{


  constructor(private livroService:BookService,private router:Router,private loginService:LoginService,private authService:AuthService) { }

  image = 'http://books.google.com/books/content?id=6z7G5VGXnScC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  page:number = 1;
  bookFromDataBase!:Book[];
  bookToShow!:Book[];
  itemsPerPage:number=12;
  totalProduct:any;
  bookToSearch!:string

  statusBook:string[] = ['todos','lido','ler','lendo','emprestado']
  statusToFilter:string = this.statusBook[0]
  filteredBooks!:Book[]
  
  ngOnInit(): void {
  
     this.livroService.read().subscribe((book) => {
      this.bookFromDataBase = book;
      this.bookToShow = this.bookFromDataBase
      console.log(book)
    })
  }

  mostrar(page:string):void{
    console.log(page)
  }

  salvar():void{
    this.router.navigate(['/create'])
  }

  editBook():void{
    this.router.navigate(['/updatebook'])
  }
  

  filter():void{
    this.bookToShow = this.bookFromDataBase
    this.filteredBooks = this.bookToShow.filter(el => el.statusBook === this.statusToFilter);
    
    if(this.statusToFilter != 'todos'){
      this.bookToShow = this.filteredBooks
    }

    // this.livroService.findBookByStatus(this.statusToFilter).subscribe((books) => {
    //   this.bookToShow = books
    // })
   
  }

  search(e:Event):void{
    const target = e.target as HTMLInputElement
    const value = target.value

    this.bookToShow = this.bookFromDataBase.filter((books) => {
      return books.title.toLocaleLowerCase().includes(value)
    })
  }

  logout():void{
    this.authService.clear();
    this.router.navigate(['/login'])
  }
  
  // searchBook():void{
  //   this.livroService.searchBook(this.bookToSearch).subscribe((books) => {
  //     this.bookToShow = books;
  //   })
  // }

  testApi():void{
    this.loginService.obterPerfil().subscribe(data => {
      console.log(data)
    })
  }



}
