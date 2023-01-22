import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { switchMap, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token = localStorage.getItem("UTENTE");

  constructor(private authSrv: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap(() => {
        if (this.token) {
          const cloned = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + this.token.replaceAll('"', ''))
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
