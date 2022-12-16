import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit{
  
  livro:Livro = {
    titulo:''
  }

  constructor(private livroService:LivroService,private router:Router){

  }

  ngOnInit(): void {
    
  }

  salvar():void{
    this.livroService.create(this.livro).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  cancelar():void{
    this.router.navigate(['/'])
  }

}
