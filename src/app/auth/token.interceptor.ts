import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { switchMap, take } from 'rxjs/operators';
import { environment } from 'src/app/environments/env';
import { ComponentService } from '../service/components.service';
import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token!:string;

  constructor(private authSrv: AuthService) {
    this.token=environment.token;
  }

  //intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   // const token = environment.token;

   // const newReq = request.clone({
     // headers: request.headers.set('Authorization', `Bearer ${environment.token}`).set("Content-Type", "application/json")
   // })

   // console.log("NUOVA RICHIESTA", newReq);
//return next.handle(newReq)
 // }

 intercept(
  request: HttpRequest<unknown>,
  next: HttpHandler
): Observable<HttpEvent<unknown>> {
  return this.authSrv.user$.pipe(
    take(1),
    switchMap((user) => {

      console.log('ti sto intercettando')
      const newReq: HttpRequest<any> = request.clone({
        headers: request.headers
          .set(
            'Authorization',
            `Bearer ${this.token}`
          )
      });

      return next.handle(newReq);
    })
  );
}
}
