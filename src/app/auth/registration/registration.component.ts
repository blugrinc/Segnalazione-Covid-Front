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

  signup(form: NgForm) {

    this.person.firstname = form.value.firstname;
    this.person.lastname = form.value.lastname;
    this.person.fiscalCode = form.value.fiscalCode;
    this.person.email = form.value.email;
    this.person.password = form.value.password;
    this.person.role = form.value.role;

    console.log(this.person)

    try {
      this.authSrv.register(this.person).subscribe();
      /*  this.router.navigate([ '/landing-page' ]) */
    } catch (error: any) {
      alert(error)
    }
  }




}
