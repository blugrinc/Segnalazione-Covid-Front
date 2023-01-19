import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ]
})
export class RegistrationComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  person = {
    firstname: "",
    lastname: "",
    email: "",
    fiscalCode: "",
    password: "",
    role: ""
  }

  ciao = {
    firstname: "Marco",
    lastname: "Caccania",
    email: "MOMMO@lollo.it",
    fiscalCod2e: "NYGOOF26R17N924Q",
    password: "admin",
    role: "DIPENDENTE"
  }

  signup(form: NgForm) {

    this.person.firstname = form.value.firstname;
    this.person.lastname = form.value.lastname;
    this.person.fiscalCode = form.value.fiscalCode;
    this.person.email = form.value.email;
    this.person.password = form.value.password;
    this.person.role = form.value.role;

    console.log(this.ciao)

    try {
      this.authSrv.register(this.ciao).subscribe();
      /*  this.router.navigate([ '/landing-page' ]) */
    } catch (error: any) {
      alert(error)
    }
  }




}
