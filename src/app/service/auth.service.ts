import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { map } from "rxjs/operators";
import { BehaviorSubject} from "rxjs";
import { Router } from '@angular/router';

export interface AuthData {
  accessToken: string;
  user: {
    email: string;
    id: number;
    firstname: string;
    lastname: string;
    fiscalCode: string;
    password: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pathApi!:string;
  private authSubject = new BehaviorSubject<null|AuthData>(null);
  user$ = this.authSubject.asObservable()
  isLoggedIn$ = this.user$.pipe(map(user=>!!user));
  autologoutTimer:any;

constructor(private http:HttpClient, private routers: Router) {
    this.pathApi=environment.pathApi;
    this.restoreUser()

}

signup(data:any){
  return this.http.post<any>(`${this.pathApi}/api/auth/signup`, data)
}

login(data: any){
  return this.http.post<any>(`${this.pathApi}/api/auth/login`, data)
}

logout(){
  this.authSubject.next(null)
  this.routers.navigate(["/login"])
  localStorage.removeItem('utenteConnesso')
  if (this.autologoutTimer) {
    clearTimeout(this.autologoutTimer)
  }
}
autoLogout(expirationDate:Date){
  const expMs = expirationDate.getTime() - new Date().getTime()
 this.autologoutTimer = setTimeout(() => {
    this.logout()
  }, expMs);
}
restoreUser(){
  const userJson = localStorage.getItem('user')
  if (!userJson) {
    return
  }
  const user:AuthData = JSON.parse(userJson)

  this.authSubject.next(user)

}


}
