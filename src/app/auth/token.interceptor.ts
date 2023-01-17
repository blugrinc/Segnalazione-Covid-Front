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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private Service: ComponentService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = environment.token;
    console.log(token);
    if (token) {
      const newReq = request.clone({
        headers: request.headers.set('Authorization', "Bearer " + token)
      });
      console.log(newReq);
      return next.handle(newReq)
    }
    else {
      console.log("request", request)
      return next.handle(request);
    }
  }
}
