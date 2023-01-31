import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { IntroPage } from './auth/introProgect/intro';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';

import { type1_SurveyComponent } from './components/report-type-1/survey/survey.component';
import { type1_ControlDataComponent } from './components/report-type-1/control-data/control-data.component';
import { type1_SymptomatologyComponent } from './components/report-type-1/symptomatology/symptomatology.component';

import { type2_SurveyComponent } from './components/report-type-2/survey/survey.component';
import { type2_ControlDataComponent } from './components/report-type-2/control-data/control-data.component';
import { type2_SymptomatologyComponent } from './components/report-type-2/symptomatology/symptomatology.component';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ExportPageComponent } from './components/export-page/export-page.component';

import { Path1Component } from './components/path/path1/path1.component';
import { Path2Component } from './components/path/path2/path2.component';
import { Path22Component } from './components/path/path22/path22.component';
import { Path25Component } from './components/path/path25/path25.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { NgbModule, NgbModalModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    IntroPage,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,

    AppComponent,
    type1_SurveyComponent,
    type1_SymptomatologyComponent,
    type1_ControlDataComponent,

    type2_SurveyComponent,
    type2_SymptomatologyComponent,
    type2_ControlDataComponent,

    ExportPageComponent,
    LandingPageComponent,

    Path1Component,
    Path2Component,
    Path22Component,
    Path25Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule
  ],
  providers:
    [ NgbModalConfig, NgbModal,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
