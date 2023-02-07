import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit{


  constructor(private livroService:LivroService,private router:Router) { }

  page:number = 1;
  bookFromDataBase!:Livro[];
  bookToShow!:Livro[];
  itemsPerPage:number=12;
  totalProduct:any;
  bookToSearch!:string

  statusBook:string[] = ['todos','lido','ler','lendo','emprestado']
  statusToFilter!:string
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
      return books.titulo.toLocaleLowerCase().includes(value)
    })
  }
  
  // searchBook():void{
  //   this.livroService.searchBook(this.bookToSearch).subscribe((books) => {
  //     this.bookToShow = books;
  //   })
  // }



}
