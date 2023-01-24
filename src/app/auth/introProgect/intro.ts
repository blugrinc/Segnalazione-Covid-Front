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

  userData: any

  constructor(private authSrv: AuthService, private router: Router,
    private componentService: ComponentService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      this.userData = data;
    });
  }
}
