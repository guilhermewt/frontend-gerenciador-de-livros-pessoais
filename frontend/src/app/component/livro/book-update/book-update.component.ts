import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExceptionsService } from 'src/app/resources/services/exceptions.service';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit{

  constructor(private livroService:LivroService,private activeRouter:ActivatedRoute,private router:Router,private exceptions:ExceptionsService){}

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
      this.exceptions.showMensage('produto atualizado','operação bem sucedida!','toast-sucess')
      this.router.navigate([''])
    })
  }

  cancel():void{
    this.router.navigate([''])
  }
  

}
