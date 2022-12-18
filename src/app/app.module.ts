import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './components/survey/survey.component';
import { PathComponent } from './components/path/path.component';
import { ExportPageComponent } from './components/export-page/export-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SymptomatologyComponent } from './components/survey/symptomatology/symptomatology.component';
import { ControlDataComponent } from './components/survey/control-data/control-data.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    PathComponent,
    ExportPageComponent,
    LandingPageComponent,
    SymptomatologyComponent,
    ControlDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
