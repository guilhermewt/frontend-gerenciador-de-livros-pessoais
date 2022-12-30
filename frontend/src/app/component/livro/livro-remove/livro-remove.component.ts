import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-remove',
  templateUrl: './livro-remove.component.html',
  styleUrls: ['./livro-remove.component.css']
})
export class LivroRemoveComponent implements OnInit{

  livro!:Livro
  constructor(private bookService:LivroService,private router:Router,private activeRouter:ActivatedRoute){}

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.bookService.readById(id!).subscribe(livro => {
      this.livro = livro;
    })
  }

  deleteBook():void{
    this.bookService.delete(this.livro.id!).subscribe(() => {
      this.router.navigate([''])
    })
  }

  cancel(): void{
    this.router.navigate([''])
  }



}
