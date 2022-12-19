import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExportPageComponent } from './components/export-page/export-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { Path1Component } from './components/path/path1/path1.component';
import { Path2Component } from './components/path/path2/path2.component';
import { Path22Component } from './components/path/path22/path22.component';
import { Path25Component } from './components/path/path25/path25.component';
import { ControlDataComponent } from './components/survey/control-data/control-data.component';
import { SurveyComponent } from './components/survey/survey.component';
import { SymptomatologyComponent } from './components/survey/symptomatology/symptomatology.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  {
    path: 'survey',
    component: SurveyComponent
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
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
  },
  {
    path: 'control-data',
    component: ControlDataComponent
  },
  {
    path: 'symptomatology',
    component: SymptomatologyComponent
  },
  {
    path: 'export-page',
    component: ExportPageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
