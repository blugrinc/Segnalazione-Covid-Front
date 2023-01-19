import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http"


import { Report } from "../models/report";
import { Observable } from "rxjs";
import { environment } from "../environments/env";


const report = {
  /* person: "person", */
  reportDate: new Date(),
  idPerson: 1,

  triage: false,
  abstention: false,
  disinfection: false,
  proposedAbstentionDate: {},

  newClassification: "",
  oldClassification: "",
  path: "",

  typeOfReport: "",

  question1: "",
  question2: "",
  question3: "",
  question4: "",
  question5: "",
  question6: "",
  question7: "",
  question8: "",

  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
  answer6: "",
  answer7: "",
  answer8: "",
}

@Injectable({
  providedIn: "root",
})
export class ComponentService {

  constructor(private http: HttpClient, private router: Router) { }

  URL = environment.pathApi;


  getSurvey_1(item: any) {
    report.typeOfReport = item.typeOfReport;
    if (report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {

      report.question1 = item.question1;
      report.question2 = item.question2;
      report.question3 = item.question3;
      report.question4 = item.question4;

      report.answer1 = item.answer1;
      report.answer2 = item.answer2;
      report.answer3 = item.answer3;
      report.answer4 = item.answer4;
    } else {

      report.question1 = item.question1;
      report.question2 = item.question2;
      report.question3 = item.question3;

      report.answer1 = item.answer1;
      report.answer2 = item.answer2;
      report.answer3 = item.answer3;

    }
  }

  getSurvey_2(item: any) {
    if (report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      report.question5 = item.question5;
      report.question6 = item.question6;

      report.answer5 = item.answer5;
      report.answer6 = item.answer6;

    } else {
      report.question4 = item.question4;
      report.question5 = item.question5;

      report.answer4 = item.answer4;
      report.answer5 = item.answer5;
    }
  }

  getSurvey_3(item: any) {
    if (report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      report.question7 = item.question7;
      report.question8 = item.question8;

      report.answer7 = item.answer7;
      report.answer8 = item.answer8;
      report.reportDate = new Date();
    } else {
      report.question6 = item.question6;
      report.answer6 = item.answer6;
      report.reportDate = new Date();
    }

    this.setOtherValueSurvey();
    this.navigatePathControll()
    return this.postSurvey(report);
  }

  setOtherValueSurvey() {
    //ABSTENTION ( TRUE OR FALSE )
    if (report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      report.abstention = true;
    } else report.abstention = false;

    //OLD CLASSIFICATION
    if (report.answer1 === "Test molecolare") {
      report.oldClassification = "CASO_PROBABILE"
    } else if (report.answer1 === "Tampone rapido") {
      report.oldClassification = "CASO_POSSIBILE"
    } else report.oldClassification = "MANTIENE_LA_PRECEDENTE";
    //NEW CLASSIFICATION
    if (report.answer1 === "Test molecolare" && report.answer8 === "NO") {
      report.newClassification = "CASO_CONFERMATO_MOLECOLARE"
    } else if (report.answer1 === "Tampone rapido" && report.answer8 === "NO") {
      report.newClassification = "CASO_CONFERMATO_ANTIGENICO"
    } else if (report.answer8 === "SI") {
      report.newClassification = "CASO_CONFERMATO_VARIANTE"
    } else report.newClassification = "MANTIENE_LA_PRECEDENTE";

    //ABSTENTION DATE
    if (report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      const abstentionDate = new Date(report.answer2);
      report.proposedAbstentionDate = new Date(abstentionDate.setDate(abstentionDate.getDate() + 14));
    } else {
      report.proposedAbstentionDate = "";
    }
    //TRIAGE
    if (report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      const date_F = new Date(report.answer2); /* data_Tampone */
      const date_H = new Date(report.answer3); /* data_Ultima_Presenza_In_Sede */
      const date_L = new Date(report.answer5); /* date_Sintomi */

      //2 GIORNI PRIMA
      const twoDaysBeforeL = new Date(date_L);
      twoDaysBeforeL.setDate(twoDaysBeforeL.getDate() - 2);
      const twoDaysBeforeF = new Date(date_F);
      twoDaysBeforeF.setDate(twoDaysBeforeF.getDate() - 2);
      //14 GIORNI PRIMA
      const fourteenDaysBeforeL = new Date(date_L);
      fourteenDaysBeforeL.setDate(fourteenDaysBeforeL.getDate() - 14);
      const fourteenBeforeF = new Date(date_F);
      fourteenBeforeF.setDate(fourteenBeforeF.getDate() - 14);
      //14 GG DOPO
      const fourteenDaysAfterL = new Date(date_L);
      fourteenDaysAfterL.setDate(fourteenDaysAfterL.getDate() + 14);
      const fourteenDaysAfterF = new Date(date_F);
      fourteenDaysAfterF.setDate(fourteenDaysAfterF.getDate() + 14);

      //SINTOMI SI, VARIANTE = NO
      if (report.answer4 === "SI" && report.answer8 === "NO") {
        if ((date_H >= twoDaysBeforeL && date_H <= fourteenDaysAfterL) ||
          (date_H >= twoDaysBeforeF && date_H <= fourteenDaysAfterF)) {
          report.triage = true;
        } else report.triage = false;
      }

      //SINTOMI SI, VARIANTE = SI
      if (report.answer4 === "SI" && report.answer8 === "NO") {
        if ((date_H >= fourteenDaysBeforeL && date_H <= fourteenDaysAfterL) ||
          (date_H >= fourteenBeforeF && date_H <= fourteenDaysAfterF)) {
          report.triage = true;
        } else report.triage = false;
      }

      //SINTOMI = NO, VARIANTE = SI
      if (report.answer4 === "NO" && report.answer8 === "NO") {
        report.answer5 = "";
        if (date_H >= fourteenBeforeF && date_H <= fourteenDaysAfterF) {
          report.triage = true;
        } else report.triage = false;
      }

      //SANIFICATION
      const threeDayBefore = new Date();
      threeDayBefore.setDate(threeDayBefore.getDate() - 3);
      if (date_H >= threeDayBefore) {
        report.disinfection = true;
      } else report.disinfection = false;

    } else {
      report.triage = false;
      report.disinfection = false;
    }
  }

  navigatePathControll() {

    if (
      report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" &&
      report.answer1 === "Test molecolare" &&
      report.answer8 === "NO") {
      report.path = "UNO";
      this.router.navigate([ '/path1' ]);
    }

    if (
      report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" &&
      report.answer1 === "Tampone rapido" &&
      report.answer8 === "NO") {
      report.path = "DUE";
      this.router.navigate([ '/path2' ]);
    }

    if (report.typeOfReport === "AGGIORNAMENTO_PER_RICHIESTA_FINE_ASTENSIONE"
    ) {
      report.path = "VENTIDUE";
      this.router.navigate([ '/path22' ]);
    }

    if (
      report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" &&
      report.answer8 === "SI") {
      report.path = "VENTICINQUE"
      this.router.navigate([ '/path25' ]);
    }
  }

  postSurvey(item: any) {
    return this.http.post<any>(`${this.URL}report/add`, item)
      .subscribe(res => console.log("ADD_REPORT", res))
      ;
  }
  getIdPerson(fiscalCode: any) {
    return this.http.get<any>(`${this.URL}person/getByFiscalCode/${fiscalCode}`)
      .subscribe(res => console.log("GET_ID_PERSON", res))
      ;
  }
}



