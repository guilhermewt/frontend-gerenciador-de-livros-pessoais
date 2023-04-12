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

  throwException(e:HttpErrorResponse):Observable<any>{
    if(e.status == 409){
      this.defaultBadException('usuario ja existente!')
    }
    else if(e.status == 403){
      this.tokenFailed()
    }
    else{
      this.defaultBadException('')
    }

    return EMPTY
  }

  tokenFailed(): Observable<any>{
      this.defaultBadException('sua sessão expirou faça o login novamente!')
      this.router.navigate(['/login'])
      return EMPTY
  }

  userNotFound(e:HttpErrorResponse):Observable<any>{
    this.showMensage('login ou senha invalido','login error','toast-error')
    return EMPTY
  }

  wrongPassword(e:HttpErrorResponse):Observable<any>{
    this.showMensage('senha errada!','login error','toast-error')
    return EMPTY
  }

  defaultBadException(mensage:string):Observable<any>{
    this.showMensage(mensage,'ocorreu um problema','toast-error')
    return EMPTY
  }

  showMensage(mensagem:string,titulo:string,tipo:string) {
    this.toastr.show(mensagem,titulo,{closeButton:true, progressBar:true},tipo)
  }
}
