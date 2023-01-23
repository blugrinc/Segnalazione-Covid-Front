import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentService } from 'src/app/service/components.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './intro.html',
  styleUrls: [ './intro.scss' ]
})

export class IntroPage implements OnInit {
  userData: any;
  userInfo: any;

  constructor(private authSrv: AuthService, private router: Router,
    private componentService: ComponentService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      console.log(data);
      this.userData = data;
      console.log("PRENDO CODICEFISCALE(intro)", this.userData);
      this.getPerson(this.userData.user.fiscalCode).subscribe((data) => {
        this.userInfo = data;
        console.log(" PRENDO LA PERSONA(intro)", data);
      });
    });

  }

  getPerson(data: string) {
    return this.componentService.getIdPerson(data);
  }
}
