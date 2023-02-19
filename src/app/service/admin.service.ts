import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) { }

  URL = environment.pathApi;
  //GET FOR REPORT
  getReportList() {
    return this.http.get<any>(`${this.URL}report/getAll`);
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
  getMatricola(matricola: string) {
    return this.http.get<any>(
      `${this.URL}report/getByMatricola/${matricola}`
    );
  }
  //GET DIPENDENTI
  getAllPerson(page: number) {
    return this.http.get<any>(`${this.URL}person/getAllEmployees`);
  }
  getAllRecovered(page: number) {
    return this.http.get<any>(`${this.URL}person/getAllRecovered`);
  }
  getAllPositive(page: number) {
    return this.http.get<any>(`${this.URL}person/getAllPositive`);
  }

}

