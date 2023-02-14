import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http"
import { environment } from "../environments/env";
import { AuthData, AuthService } from "../auth/auth.service";
import { Report } from "../models/report";
import { Survey } from "../models/survey";
import { Person } from "../models/person";

@Injectable({
  providedIn: "root",
})
export class ComponentService {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  user!: AuthData | null;
  person!: Person;

  report: Report = {
    idPerson: 1,
    reportingDate: new Date(),

    triage: false,
    abstention: false,
    disinfection: false,
    proposedAbstentionDate: "",

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

  async sendSurvey(item: Survey) {

    if (item.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      this.report.typeOfReport = item.typeOfReport;
      this.report.question1 = item.question1;
      this.report.question2 = item.question2;
      this.report.question3 = item.question3;
      this.report.question4 = item.question4;
      this.report.question5 = item.question5;
      this.report.question6 = item.question6;
      this.report.question7 = item.question7;
      this.report.question8 = item.question8;

      this.report.answer1 = item.answer1;
      this.report.answer2 = item.answer2;
      this.report.answer3 = item.answer3;
      this.report.answer4 = item.answer4;
      this.report.answer5 = item.answer5;
      this.report.answer6 = item.answer6;
      this.report.answer7 = item.answer7;
      this.report.answer8 = item.answer8;
      this.report.reportingDate = new Date();
    }
    if (item.typeOfReport === "AGGIORNAMENTO_PER_RICHIESTA_FINE_ASTENSIONE") {
      this.report.typeOfReport = item.typeOfReport;
      this.report.question1 = item.question1;
      this.report.question2 = item.question2;
      this.report.question3 = item.question3;
      this.report.question4 = item.question4;
      this.report.question5 = item.question5;
      this.report.question6 = item.question6;

      this.report.answer1 = item.answer1;
      this.report.answer2 = item.answer2;
      this.report.answer3 = item.answer3;
      this.report.answer4 = item.answer4;
      this.report.answer5 = item.answer5;
      this.report.answer6 = item.answer6;

      this.report.reportingDate = new Date();
    }
    await this.setReportIdPerson()
    this.setOtherValueSurvey();
    this.navigatePathControll();
    return this.postSurvey(this.report);
  }

  setOtherValueSurvey() {
    //ABSTENTION ( TRUE OR FALSE )
    if (this.report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      this.report.abstention = true;
    } else this.report.abstention = false;

    //OLD CLASSIFICATION
    if (this.report.answer1 === "Test molecolare") {
      this.report.oldClassification = "CASO_PROBABILE"
    } else if (this.report.answer1 === "Tampone rapido") {
      this.report.oldClassification = "CASO_POSSIBILE"
    } else this.report.oldClassification = "MANTIENE_LA_PRECEDENTE";
    //NEW CLASSIFICATION
    if (this.report.answer1 === "Test molecolare" && this.report.answer8 === "NO") {
      this.report.newClassification = "CASO_CONFERMATO_MOLECOLARE"
    } else if (this.report.answer1 === "Tampone rapido" && this.report.answer8 === "NO") {
      this.report.newClassification = "CASO_CONFERMATO_ANTIGENICO"
    } else if (this.report.answer8 === "SI") {
      this.report.newClassification = "CASO_CONFERMATO_VARIANTE"
    } else this.report.newClassification = "MANTIENE_LA_PRECEDENTE";

    //ABSTENTION DATE
    if (this.report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" && this.report.answer2 !== "") {
      const abstentionDate = new Date(this.report.answer2);
      this.report.proposedAbstentionDate = new Date(abstentionDate.setDate(abstentionDate.getDate() + 14));

    } else {
      this.report.proposedAbstentionDate = "";
    }
    //TRIAGE
    if (this.report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO") {
      const date_F = new Date(this.report.answer2); /* data_Tampone */
      const date_H = new Date(this.report.answer3); /* data_Ultima_Presenza_In_Sede */
      const date_L = new Date(this.report.answer5); /* date_Sintomi */

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
      if (this.report.answer4 === "SI" && this.report.answer8 === "NO") {
        if ((date_H >= twoDaysBeforeL && date_H <= fourteenDaysAfterL) ||
          (date_H >= twoDaysBeforeF && date_H <= fourteenDaysAfterF)) {
          this.report.triage = true;
        } else this.report.triage = false;
      }

      //SINTOMI SI, VARIANTE = SI
      if (this.report.answer4 === "SI" && this.report.answer8 === "NO") {
        if ((date_H >= fourteenDaysBeforeL && date_H <= fourteenDaysAfterL) ||
          (date_H >= fourteenBeforeF && date_H <= fourteenDaysAfterF)) {
          this.report.triage = true;
        } else this.report.triage = false;
      }

      //SINTOMI = NO, VARIANTE = SI
      if (this.report.answer4 === "NO" && this.report.answer8 === "NO") {
        this.report.answer5 = "";
        if (date_H >= fourteenBeforeF && date_H <= fourteenDaysAfterF) {
          this.report.triage = true;
        } else this.report.triage = false;
      }

      //SANIFICATION
      const threeDayBefore = new Date();
      threeDayBefore.setDate(threeDayBefore.getDate() - 3);
      if (date_H >= threeDayBefore) {
        this.report.disinfection = true;
      } else this.report.disinfection = false;

    } else {
      this.report.triage = false;
      this.report.disinfection = false;
    }
  }

  navigatePathControll() {

    if (
      this.report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" &&
      this.report.answer1 === "Test molecolare" &&
      this.report.answer8 === "NO") {
      this.report.path = "UNO";
      this.router.navigate([ '/path1' ]);
    }

    if (
      this.report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" &&
      this.report.answer1 === "Tampone rapido" &&
      this.report.answer8 === "NO") {
      this.report.path = "DUE";
      this.router.navigate([ '/path2' ]);
    }

    if (this.report.typeOfReport === "AGGIORNAMENTO_PER_RICHIESTA_FINE_ASTENSIONE"
    ) {
      this.report.path = "VENTIDUE";
      this.router.navigate([ '/path22' ]);
    }

    if (
      this.report.typeOfReport === "SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO" &&
      this.report.answer8 === "SI") {
      this.report.path = "VENTICINQUE"
      this.router.navigate([ '/path25' ]);
    }
  }

  async setReportIdPerson() {
    return new Promise((resolve) => {
      this.authService.user$.subscribe(res => this.user = res);
      this.getPerson(this.user!.user.fiscalCode).subscribe((res) => {
        resolve(this.report.idPerson = +res.idPerson)
      });
    })
  }

  postSurvey(item: any) {
    return this.http.post<any>(`${environment.pathApi}report/add`, item)
      .subscribe(res => console.log("ADD_REPORT", res))
  }

  getPerson(fiscalCode: string) {
    const data = this.http.get<Person>(`${environment.pathApi}person/getByFiscalCode/${fiscalCode}`)
    return data;
  }
}



