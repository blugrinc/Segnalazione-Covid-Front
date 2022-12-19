import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './components/survey/survey.component';
import { ExportPageComponent } from './components/export-page/export-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SymptomatologyComponent } from './components/survey/symptomatology/symptomatology.component';
import { ControlDataComponent } from './components/survey/control-data/control-data.component';
import { Path1Component } from './components/path/path1/path1.component';
import { Path2Component } from './components/path/path2/path2.component';
import { Path22Component } from './components/path/path22/path22.component';
import { Path25Component } from './components/path/path25/path25.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    ExportPageComponent,
    LandingPageComponent,
    SymptomatologyComponent,
    ControlDataComponent,
    Path1Component,
    Path2Component,
    Path22Component,
    Path25Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
