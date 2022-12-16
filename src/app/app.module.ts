import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './components/survey/survey.component';
import { PathComponent } from './components/path/path.component';
import { ExportPageComponent } from './components/exportPage/export-page/export-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    PathComponent,
    ExportPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
