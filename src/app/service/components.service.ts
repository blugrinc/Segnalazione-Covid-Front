import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http"


import { Report } from "../models/report";
import { Observable } from "rxjs";
import { getLocaleDateFormat } from "@angular/common";
import { IfStmt } from "@angular/compiler";
import { environment } from "../environments/env";


const report = {
  /* person: "person", */
  idPerson: 1,
  reportDate: new Date(),
  triage: true,
  abstention: false,
  disinfection: false,

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

  newClassification: "MANTIENE_LA_PRECEDENTE",
  oldClassification: "MANTIENE_LA_PRECEDENTE",
  proposedAbstentionDate: {},
  path: "VENTIDUE",
}



@Injectable({
  providedIn: "root",
})
export class ComponentService {

  constructor(private http: HttpClient, private router: Router) { }

  URL= environment.pathApi;


  getSurvey_1(item: any) {
    if (item.value !== "") {
      report.typeOfReport = item.typeOfReport;
      report.question1 = item.question1;
      report.question2 = item.question2;
      report.question3 = item.question3;
      report.question4 = item.question4;

      report.answer1 = item.answer1;
      report.answer2 = item.answer2;
      report.answer3 = item.answer3;
      report.answer4 = item.answer4;
    }
  }
  getSurvey_2(item: any) {
    if (item.value !== "") {
      report.question5 = item.question5;
      report.question6 = item.question6;

      report.answer5 = item.answer5;
      report.answer6 = item.answer6;

    }
  }
  getSurvey_3(item: any) {
    if (item.value !== "") {
      report.question7 = item.question7;
      report.question8 = item.question8;

      report.answer7 = item.answer7;
      report.answer8 = item.answer8;
      report.reportDate = new Date();
    }

    this.setOtherValueSurvey();
    this.redirectControll()
    console.log(report);
    return this.postSurvey(report);
  }

  setOtherValueSurvey() {
    //ABSTENTION ( TRUE OR FALSE )
    if (report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      report.abstention = true;
    }
    //OLD CLASSIFICATION
    if (report.answer1 === "Test_molecolare") {
      report.oldClassification = "CASO_PROBABILE"
    } else if (report.answer1 === "Tampone_rapido") {
      report.oldClassification = "CASO_POSSIBILE"
    }
    //NEW CLASSIFICATION
    if (report.answer1 === "Test_molecolare" && report.answer8 === "no") {
      report.newClassification = "CASO_CONFERMATO_MOLECOLARE"
    } else if (report.answer1 === "Tampone_rapido" && report.answer8 === "no") {
      report.newClassification = "CASO_CONFERMATO_ANTIGENICO"
    } else if (report.answer8 === "si") {
      report.newClassification = "CASO_CONFERMATO_VARIANTE"
    }

    //ABSTENTION DATE
    if (report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      const abstentionDate = new Date(report.answer2);
      report.proposedAbstentionDate = new Date(abstentionDate.setDate(abstentionDate.getDate() + 14));
    } else {
      report.proposedAbstentionDate = "";
    }
    //TRIAGE
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
    if (report.answer4 === "si" && report.answer8 === "no") {


      console.log("TRIAGE 1.2")
      if ((date_H >= twoDaysBeforeL && date_H <= fourteenDaysAfterL) ||
        (date_H >= twoDaysBeforeF && date_H <= fourteenDaysAfterF)) {
        console.log("TRIAGE 1.2")
        report.triage = true;
      } else report.triage = false;
    }

    //SINTOMI SI, VARIANTE = SI
    if (report.answer4 === "si" && report.answer8 === "si") {
      console.log("TRIAGE 2.1")

      if ((date_H >= fourteenDaysBeforeL && date_H <= fourteenDaysAfterL) ||
        (date_H >= fourteenBeforeF && date_H <= fourteenDaysAfterF)) {
        console.log("TRIAGE 2.2")
        report.triage = true;
      } else report.triage = false;
    }

    //SINTOMI = NO, VARIANTE = SI
    if (report.answer4 === "no" && report.answer8 === "si") {
      report.answer5 = "";
      console.log("TRIAGE 3.1")
      if (date_H >= fourteenBeforeF && date_H <= fourteenDaysAfterF) {
        console.log("TRIAGE 3.2")
        report.triage = true;
      } else report.triage = false;
    }
    //SANIFICATION
    const threeDayBefore = new Date();
    threeDayBefore.setDate(threeDayBefore.getDate() - 3);
    if (date_H >= threeDayBefore) {
      report.disinfection = true;
    } else report.disinfection = false;
  }

  redirectControll() {

    if (
      report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" &&
      report.answer1 === "Test_molecolare" &&
      report.answer8 === "no") {
      report.path = "UNO";
      this.router.navigate([ '/path1' ]);
    }

    if (
      report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" &&
      report.answer1 === "Tampone_rapido" &&
      report.answer8 === "no") {
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
      report.answer8 === "si") {
      report.path = "VENTICINQUE"
      this.router.navigate([ '/path25' ]);
    }
  }

  postSurvey(item: any) {
    return this.http.post<any>(`${this.URL}report/add`, item)
    .subscribe(res => console.log(res))
      ;
  }



}



