import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../environments/env';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthData {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //questa variabile serve per tenere traccia dell'access token
  private authSub = new BehaviorSubject<AuthData | null>(null);
  user$ = this.authSub.asObservable();
  timeoutRef: any;
  isLoggedIn$ = this.user$.pipe(map(user => !!user));

  constructor(private http: HttpClient, private router: Router) {
  }


  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${environment.pathApi}auth/authenticate`, data)
      .pipe(
        tap((data) => {
          console.log('LOGIN_DATA:', data);
          localStorage.setItem('UTENTE', JSON.stringify(data.token));
          this.authSub.next(data);
        }),
        catchError(this.errors)
      );
  }
  register(data: any) {
    return this.http.post<AuthData>(`${environment.pathApi}auth/register`, data)
      .pipe(
        tap((data) => {
          console.log("UTENTE REGISTRATO", data)
          localStorage.setItem('UTENTE', JSON.stringify(data.token));
        }),
        catchError(this.errors)
      );
  }

  restore() {
    const userJson = localStorage.getItem('UTENTE')
    if (!userJson) {
      return
    }
    const user: AuthData = JSON.parse(userJson)
    this.authSub.next(user)
  }


  logout() {
    this.authSub.next(null);
    localStorage.removeItem('UTENTE');
    this.router.navigate([ '/login' ]);
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
  }

  private errors(err: any) {
    switch (err.error) {
      case "Email and password are required":
        return throwError("Email e password sono obbligatorie");
        break;
      case "Email already exists":
        return throwError("L'utente risulta già registrato");
        break;
      case "Email format is invalid":
        return throwError("Il formato della mail non è valido");
        break;
      case "Cannot find user":
        return throwError("L'utente non esiste");
        break;

      default:
        return throwError("Errore nella chiamata");
        break;
    }
  }
}
