import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from "../environments/env";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient, private router: Router) { }

  URL = environment.pathApi;

  getReportList(page: number) {
    return this.http.get<any>(
      `${this.URL}report/getAll`
    );
  }

  getReportByReportingDate(date: Date) {
    return this.http.get<any>(
      `${this.URL}report/getByReportingDate?reportingDate=${date}`
    );
  }

  getReportBetweenDate(minDate: Date, maxDate: Date) {
    return this.http.get<any>(
      `${this.URL}report/getByDateBetween?start=${minDate}&end=${maxDate}`
    );
  }
}