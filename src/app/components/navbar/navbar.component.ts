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
  serialNumber!: number;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLocalStorage();
    this.getMatricola();
    this.checkIfLogged();
  }

  getMatricola() {
    if (this.authService.isLoggedIn$) {
      this.serialNumber = Math.floor(Math.random() * 1000000);
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
