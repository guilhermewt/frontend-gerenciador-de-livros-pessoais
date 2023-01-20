import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './component/template/header/header.component';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component';
import { LivroReadComponent } from './component/livro/livro-read/livro-read.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LivroCreateComponent } from './component/livro/livro-create/livro-create.component';
import { BookUpdateComponent } from './component/livro/book-update/book-update.component';
import { LivroRemoveComponent } from './component/livro/livro-remove/livro-remove.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPen, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { LoanComponent } from './component/loan/loan/loan.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LivroCrudComponent,
    LivroReadComponent,
    LivroCreateComponent,
    BookUpdateComponent,
    LivroRemoveComponent,
    LoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    FontAwesomeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library:FaIconLibrary){
    library.addIcons(faCoffee,faPen,faTrash)
  }
}
