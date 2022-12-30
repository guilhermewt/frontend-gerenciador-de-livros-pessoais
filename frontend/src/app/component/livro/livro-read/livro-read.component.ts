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
  livro!:Livro[];
  itemsPerPage:number=12;
  totalProduct:any;
  
  ngOnInit(): void {
  
     this.livroService.read().subscribe((livro) => {
      this.livro = livro;
      this.totalProduct = livro.length;
    })
  }

  salvar():void{
    this.router.navigate(['/create'])
  }

  editBook():void{
    this.router.navigate(['/updatebook'])
  }

}
