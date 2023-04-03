import { Component, OnInit } from '@angular/core';
import { AuthService } from './resources/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl:"app.component.html",
  styles: []
})
export class AppComponent implements OnInit{
  title = 'frontend';

  showMenu:Boolean = false
  
  constructor(private authService:AuthService){ }

  ngOnInit(): void {
    this.authService.showMenuEmitter.subscribe(
    show => this.showMenu = show
   )

  }
}
