import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ]
})
export class RegistrationComponent {

  constructor(
    private authSrv: AuthService,
    private router: Router) { }


  person = {
    email: "",
    fiscalCode: "",
    password: "",
  }

  signup(form: NgForm) {
    this.person.fiscalCode = form.value.fiscalCode;
    this.person.email = form.value.email;
    this.person.password = form.value.password;
    console.log(this.person)

    try {
      this.authSrv.register(this.person).subscribe();
      /*  this.router.navigate([ '/landing-page' ]) */
    } catch (error: any) {
      alert(error)
    }
  }
}
