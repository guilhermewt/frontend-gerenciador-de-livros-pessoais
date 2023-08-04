import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/component/login/login-services/login.service';
import { BookService } from '../book-services/book.service';
import { AuthService } from 'src/app/component/auth/auth-services/auth.service';
import { Book, Genrers } from '../books-model/Book.model';

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

  statusBook:string[] = ['TODOS','LIDO','LER','LENDO','EMPRESTADO']
  statusToFilter:string = this.statusBook[0]
  filteredBooks!:Book[]

  authorSearch:string = ''

  genrersFromApi!:Genrers[]

  genrerToSearch!:Genrers
  
  ngOnInit(): void {
     this.livroService.read().subscribe((book) => {
      this.bookFromDataBase = book;
      this.bookToShow = this.bookFromDataBase
      console.log(book)
    })

    this.livroService.findAllGenrers().subscribe((data) =>{
      this.genrersFromApi = data
      this.genrerToSearch = this.genrersFromApi[0]
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
    /*this.bookToShow = this.bookFromDataBase
    this.filteredBooks = this.bookToShow.filter(el => el.statusBook === this.statusToFilter);
    
    if(this.statusToFilter != 'todos'){
      this.bookToShow = this.filteredBooks
    }
 
    */
    if(this.statusToFilter == this.statusBook[0]){
      this.livroService.read().subscribe(data => {
        this.bookToShow = data
      })
     
    }
    else{
      this.livroService.findBookByStatus(this.statusToFilter).subscribe((books) => {
        this.bookToShow = books
      })
    }

  }

  filterByAuthor():void{
      this.livroService.findBookByAuthor(this.authorSearch).subscribe((books) => {
        this.bookToShow = books
      })
  }

  filterByGenrer():void{
    this.livroService.findBookByGenrer(this.genrerToSearch.name).subscribe((books) => {
      this.bookToShow = books
    })
}

  search(e:Event):void{
    const target = e.target as HTMLInputElement
    const value = target.value

    console.log(value)
    // this.bookToShow = this.bookFromDataBase.filter((books) => {
    //   return books.title.toLocaleLowerCase().includes(value)
    // })

    this.livroService.searchBook(value).subscribe(books => {
      this.bookToShow = books
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
