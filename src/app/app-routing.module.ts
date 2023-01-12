import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ExportPageComponent } from './components/export-page/export-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

import { type1_SurveyComponent } from './components/report-type-1/survey/survey.component';
import { type1_ControlDataComponent } from './components/report-type-1/control-data/control-data.component';
import { type1_SymptomatologyComponent } from './components/report-type-1/symptomatology/symptomatology.component';

import { type2_SurveyComponent } from './components/report-type-2/survey/survey.component';
import { type2_ControlDataComponent } from './components/report-type-2/control-data/control-data.component';
import { type2_SymptomatologyComponent } from './components/report-type-2/symptomatology/symptomatology.component';

import { Path1Component } from './components/path/path1/path1.component';
import { Path2Component } from './components/path/path2/path2.component';
import { Path22Component } from './components/path/path22/path22.component';
import { Path25Component } from './components/path/path25/path25.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  // TIPOLOGIA SEGNALAZIONE 1
  {
    path: 'survey:1',
    component: type1_SurveyComponent
  },
  {
    path: 'control-data:1',
    component: type1_ControlDataComponent
  },
  {
    path: 'symptomatology:1',
    component: type1_SymptomatologyComponent
  },
  //TIPOLOGIA SEGNALAZIONE 2
  {
    path: 'survey:2',
    component: type2_SurveyComponent
  },
  {
    path: 'control-data:2',
    component: type2_ControlDataComponent
  },
  {
    path: 'symptomatology:2',
    component: type2_SymptomatologyComponent
  },

  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  {
    path: 'export-page',
    component: ExportPageComponent
  },

  {
    path: 'path1',
    component: Path1Component
  },
  {
    path: 'path2',
    component: Path2Component
  },
  {
    path: 'path22',
    component: Path22Component
  },
  {
    path: 'path25',
    component: Path25Component
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
