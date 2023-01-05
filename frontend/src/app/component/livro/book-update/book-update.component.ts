import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit{

  constructor(private livroService:LivroService,private activeRouter:ActivatedRoute,private router:Router){}

  livro!:Livro
  statusBook:string[] = ['lido','ler'];

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.livroService.readById(id!).subscribe(livro => {
      this.livro = livro;
    })
  }

  update():void{
    this.livroService.update(this.livro).subscribe(() => {
      this.livroService.showMensage('produto atualizado')
      this.router.navigate([''])
    })
  }

  cancel():void{
    this.router.navigate([''])
  }
  

}
