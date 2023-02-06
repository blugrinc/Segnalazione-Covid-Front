import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

//AUTENTICAZIONE
import { IntroPage } from './auth/introProgect/intro';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';

//MEDICO
import { ExportPageComponent } from './components/export-page/export-page.component';
import { MedicoGuard } from './auth/routeGuard/medico.guard';
//ATTERRAGGIO REPORT
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DipendenteGuard } from './auth/routeGuard/dipendente.guard';
//PRIMO REPORT
import { surveyPath_01 } from './components/report-type-1/surveyPath_01';
import { surveyPath_02 } from './components/report-type-2/surveyPath_02';

//PERSORCI FINALI
import { Path1Component } from './components/path/path1/path1.component';
import { Path2Component } from './components/path/path2/path2.component';
import { Path22Component } from './components/path/path22/path22.component';
import { Path25Component } from './components/path/path25/path25.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'introPage',
    pathMatch: 'full'
  },
  {
    path: 'introPage',
    component: IntroPage,
  },
  //AUTENTICAZIONE
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'signup',
    component: RegistrationComponent,
  },

  //PAGINA INIZIALE REPORT
  {
    path: 'reportPage',
    component: LandingPageComponent,
    canActivate: [ DipendenteGuard ]
  },

  //EXPORT PAGE
  {
    path: 'exportPage',
    component: ExportPageComponent,
    canActivate: [ MedicoGuard ]
  },


  // TIPOLOGIA SEGNALAZIONE 1
  {
    path: 'survey:1',
    component: surveyPath_01,
    canActivate: [ DipendenteGuard ]
  },

  // TIPOLOGIA SEGNALAZIONE 2
  {
    path: 'survey:2',
    component: surveyPath_02,
  },

  //RISULTATI PERCORSI
  {
    path: 'path1',
    component: Path1Component,
    canActivate: [ DipendenteGuard ]
  },
  {
    path: 'path2',
    component: Path2Component,
    canActivate: [ DipendenteGuard ]
  },
  {
    path: 'path22',
    component: Path22Component,
    canActivate: [ DipendenteGuard ]
  },
  {
    path: 'path25',
    component: Path25Component,
    canActivate: [ DipendenteGuard ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
