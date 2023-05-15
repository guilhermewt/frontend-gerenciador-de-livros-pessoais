import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/resources/services/login.service';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { AuthService } from 'src/app/resources/services/auth.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit{


  constructor(private livroService:LivroService,private router:Router,private loginService:LoginService,private authService:AuthService) { }

  page:number = 1;
  bookFromDataBase!:Livro[];
  bookToShow!:Livro[];
  itemsPerPage:number=12;
  totalProduct:any;
  bookToSearch!:string

  statusBook:string[] = ['todos','lido','ler','lendo','emprestado']
  statusToFilter:string = this.statusBook[0]
  filteredBooks!:Livro[]
  
  ngOnInit(): void {
  
     this.livroService.read().subscribe((book) => {
      this.bookFromDataBase = book;
      this.bookToShow = this.bookFromDataBase
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
    this.filteredBooks = this.bookToShow.filter(el => el.status === this.statusToFilter);
    
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
