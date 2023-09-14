import { AppComponent } from './../../../app.component';
import { AuthService } from '../../auth/auth-services/auth.service';
import { Router } from '@angular/router';

import { Component, HostListener, OnInit } from '@angular/core';
import { BookService } from '../../book/book-services/book.service';
import { BookReadComponent } from '../../book/book-read/book-read.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private bookRead:BookReadComponent ,private livroService:BookService,private router:Router,
    private authService:AuthService,private appComponent:AppComponent
   ) { }
  
    ngOnInit(): void {
  }

  isLarguraMaiorQue991: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Verifica o tamanho do elemento (largura) e define a condição
    this.isLarguraMaiorQue991 = window.innerWidth > 991;
  }

  verifyIfShowMenuElements():Boolean{
    return this.appComponent.showMenu
  }

  isPaginaEspecificaRoute(): boolean {
    return this.router.url.includes('/home');
  }

  logout():void{
    this.authService.clear();
    this.router.navigate(['/login'])
  }
}
