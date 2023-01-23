import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  /* user = localStorage.getItem("UTENTE"); */
  constructor(private authSrv: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let object: any;
    this.authSrv.user$.subscribe((data) => {
      object = data;
      console.log("TOKEN INTERCEPTOR", object.token);
    });

    return this.authSrv.user$.pipe(
      take(1),
      switchMap(() => {
        if (object) {
          const cloned = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + object.token)
              .set("Content-Type", "application/json")
          });
          return next.handle(cloned);
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
