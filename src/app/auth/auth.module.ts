import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { MatFormFieldModule } from '@angular/material/form-field'; //importa il modulo per i campi di form in angular material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from '../components/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [ LoginComponent, RegistrationComponent ],
  imports: [
    CommonModule,

    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot(routes),

    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatPseudoCheckboxModule,
    MatIconModule,

    BrowserAnimationsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [ RouterModule ],
})
export class AuthModule { }
