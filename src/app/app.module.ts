import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { IntroPage } from './pages/home-page/intro';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

import { surveyPath_01 } from './components/report-type-1/surveyPath_01';
import { surveyPath_02 } from './components/report-type-2/surveyPath_02';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ExportPageComponent } from './pages/export-page/export-page.component';

import { Path1Component } from './components/path/path1/path1.component';
import { Path2Component } from './components/path/path2/path2.component';
import { Path22Component } from './components/path/path22/path22.component';
import { Path25Component } from './components/path/path25/path25.component';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { NgbModule, NgbModalModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    IntroPage,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    AdminPageComponent,

    AppComponent,
    surveyPath_01,
    surveyPath_02,

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
