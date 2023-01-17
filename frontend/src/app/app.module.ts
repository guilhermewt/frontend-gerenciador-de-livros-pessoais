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
import { TestingComponent } from './component/testofthesoftwarebug/testing/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LivroCrudComponent,
    LivroReadComponent,
    LivroCreateComponent,
    BookUpdateComponent,
    LivroRemoveComponent,
    TestingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
