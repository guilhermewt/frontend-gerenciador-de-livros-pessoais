import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookReadComponent } from './component/book/book-read/book-read.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookCreateComponent } from './component/book/book-create/book-create.component';
import { BookUpdateComponent } from './component/book/book-update/book-update.component';
import { BookRemoveComponent } from './component/book/book-remove/book-remove.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faArrowCircleUp, faBars, faCoffee, faFilter, faPen, faSearch, faTrash, faTrashCan, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { LoanComponent } from './component/loan/loan-read/loan-read.component';
import { LoanCreateComponent } from './component/loan/loan-create/loan-create.component';
import { LoginComponent } from './component/login/login.component';
import { LogInterceptor }from './component/login/login-services/LogInterceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordComponent } from './component/user/change-password/change-password.component';
import { CreateUserComponent } from './component/user/create-user/create-user.component';
import { BookFilterComponent } from './component/book/book-filter/book-filter.component';
import { HeaderComponent } from './component/template/header/header.component';
import { SearchBookComponent } from './component/book/search-book/search-book.component';
import { BookPaginationComponent } from './component/book/book-pagination/book-pagination.component';
import { BookShowComponent } from './component/book/book-show/book-show.component';
import { DashboardBookComponent } from './component/dashboards/dashboard-book/dashboard-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BookReadComponent,
    BookCreateComponent,
    BookUpdateComponent,
    BookRemoveComponent,
    LoanComponent,
    LoanCreateComponent,
    LoginComponent,
    ChangePasswordComponent,
    CreateUserComponent,
    BookFilterComponent,
    HeaderComponent,
    SearchBookComponent,
    BookPaginationComponent,
    BookShowComponent,
    DashboardBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right',
    preventDuplicates: true,}),
     BrowserAnimationsModule, 
     ReactiveFormsModule
    
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LogInterceptor,
    multi: true,   
  },
  BookReadComponent,
  BookFilterComponent
],
  bootstrap: [AppComponent],
  
  exports:[
    BookFilterComponent
  ]
})
export class AppModule { 
  constructor(library:FaIconLibrary){
    library.addIcons(faCoffee,faPen,faTrash,faUserCircle,faUser,faBars,faSearch,faFilter,faAdd,faArrowCircleUp)
  }
}
