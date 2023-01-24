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
import { type1_SurveyComponent } from './components/report-type-1/survey/survey.component';
import { type1_ControlDataComponent } from './components/report-type-1/control-data/control-data.component';
import { type1_SymptomatologyComponent } from './components/report-type-1/symptomatology/symptomatology.component';
//SECONDO REPORT
import { type2_SurveyComponent } from './components/report-type-2/survey/survey.component';
import { type2_ControlDataComponent } from './components/report-type-2/control-data/control-data.component';
import { type2_SymptomatologyComponent } from './components/report-type-2/symptomatology/symptomatology.component';
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
    canActivate: [DipendenteGuard]
  },

  //EXPORT PAGE
  {
    path: 'exportPage',
    component: ExportPageComponent,
    canActivate: [MedicoGuard]
  },
  // TIPOLOGIA SEGNALAZIONE 1
  {
    path: 'survey:1',
    component: type1_SurveyComponent,
    canActivate: [DipendenteGuard]
  },
  {
    path: 'control-data:1',
    component: type1_ControlDataComponent,
    canActivate: [DipendenteGuard]
  },
  {
    path: 'symptomatology:1',
    component: type1_SymptomatologyComponent,
    canActivate: [DipendenteGuard]
  },

  //TIPOLOGIA SEGNALAZIONE 2
  {
    path: 'survey:2',
    component: type2_SurveyComponent,
    canActivate: [DipendenteGuard]
  },
  {
    path: 'control-data:2',
    component: type2_ControlDataComponent,
    canActivate: [DipendenteGuard]
  },
  {
    path: 'symptomatology:2',
    component: type2_SymptomatologyComponent,
    canActivate: [DipendenteGuard]
  },
  //RISULTATI PERCORSI
  {
    path: 'path1',
    component: Path1Component,
    canActivate: [DipendenteGuard]
  },
  {
    path: 'path2',
    component: Path2Component,
    canActivate: [DipendenteGuard]
  },
  {
    path: 'path22',
    component: Path22Component,
    canActivate: [DipendenteGuard]
  },
  {
    path: 'path25',
    component: Path25Component,
    canActivate: [DipendenteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
