import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class LogInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): 
      Observable<HttpEvent<any>> {
        const dupReq = req.clone({
           headers: req.headers.set('Authorization','Bearer ' + sessionStorage.getItem('token') )
        });
        return next.handle(dupReq);
    }
}