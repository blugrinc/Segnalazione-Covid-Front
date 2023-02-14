import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {

  isExpanded: boolean = false;
  serialNumber!: any;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLocalStorage();
    this.checkIfLogged();
    this.getMatricola();
  }

  getMatricola() {
    if (this.authService.isLoggedIn$) {
      this.serialNumber = this.authService.matricola;
      console.log(this.serialNumber);
    }
  }

  checkIfLogged() {
    return this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
  }

}
