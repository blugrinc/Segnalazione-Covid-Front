import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/components.service';
import { AuthData, AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './intro.html',
  styleUrls: [ './intro.scss' ],
})
export class IntroPage implements OnInit {
  constructor(
    private authService: AuthService,
    private componentService: ComponentService
  ) { }

  user!: AuthData | null;
  datiUser: any;

  ngOnInit(): void {
    this.authService.checkLocalStorage();
    this.checkIfLogged();
    this.getUser();
  }

  getUser() {
    if (this.authService.isLoggedIn$) {
      this.authService.user$.subscribe((res) => {
        this.user = res;
      });
      this.componentService
        .getPerson(this.user!.user.fiscalCode)
        .subscribe((res) => {
          this.datiUser = res;
        });
    }
  }

  checkIfLogged() {
    return this.authService.isLoggedIn$;
  }
}
