import { Injectable } from '@angular/core';
import { Observable,EMPTY,map,catchError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ExceptionsService {

  constructor(private router:Router,private toastr: ToastrService) { }

  errorHandler(e:HttpErrorResponse): Observable<any>{
    if(e.status == 403 || 500){
      console.log('ocorreu um error na operacao','error!','token invalido! faça o login novamente')
      this.router.navigate(['/login'])
      return EMPTY
    }
    else{
       console.log('ocorreu um error na operacao')
    }
    return EMPTY
  }

  userNotFound(e:HttpErrorResponse):Observable<any>{
    console.log('login ou senha invalidos!')
    this.showMensage('login ou senha invalido','login error','toast-error')
    return EMPTY
  }

  showMensage(mensagem:string,titulo:string,tipo:string) {
    this.toastr.show(mensagem,titulo,{closeButton:true, progressBar:true},tipo)
  }
}
