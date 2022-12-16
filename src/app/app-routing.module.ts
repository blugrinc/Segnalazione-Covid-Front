import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathComponent } from './components/path/path.component';
import { SurveyComponent } from './components/survey/survey.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'survey',
    component: SurveyComponent
  },
  {
    path: 'path',
    component: PathComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
