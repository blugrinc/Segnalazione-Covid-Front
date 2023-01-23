import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent {
  constructor(private authSrv: AuthService, private router: Router) { }
  isLoggedIn$ = localStorage.getItem('UTENTE') !== null || undefined;

  user$ = this.authSrv.user$

  logout() {
    localStorage.removeItem("UTENTE");
    localStorage.clear();
    alert('logged out');
    this.router.navigate([ '/signup' ]);
  }


}
