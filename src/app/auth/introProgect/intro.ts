import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './intro.html',
  styleUrls: [ './intro.scss' ]
})
export class IntroPage implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  user$ = this.authSrv.user$
  medico = this.authSrv.user$.value
  logout() {
    this.authSrv.logout();
  }
}
