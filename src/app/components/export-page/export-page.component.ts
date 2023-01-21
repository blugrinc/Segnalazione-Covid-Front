import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/service/medico.service';
import { NgbModal, NgbModalModule, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-export-page',
  templateUrl: './export-page.component.html',
  styleUrls: [ './export-page.component.scss' ]
})
export class ExportPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private modalService: NgbModal,
    config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  /*
    reports = [
      {
        idRepor: 25,
        reportDate: "16/01/2023",
        person: {
          name: "Luca",
          surname: "Grillo",
        },
        typeOfReport: "SONO MORTO",
        reportingDate: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
      },

      {
        idRepor: 1,
        reportDate: "15/01/2023",
        person: {
          name: "Marco",
          surname: "Friggido",
        },
        typeOfReport: "SONO POSITIVO",
        reportingDate: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
      },

      {
        idRepor: 524,
        reportDate: "14/01/2023",
        person: {
          name: "Cane",
          surname: "Pelato",
        },
        typeOfReport: "SONO POSITIVO",
        reportingDate: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
      },
    ]; */

  reports!: any;
  dataReports!: any;
  intervallReports!: any;

  persons!: any;
  page!: any;

  filter!: FormGroup;
  selectedOption!: string;

  ngOnInit(): void {
    this.medicoService.getReportList().subscribe((res) => {
      console.log("GetAllReport", res)
      this.page = res;
      this.reports = res.content;
    });
    this.InitForm();
  }

  handleSelectChange(event: any) {
    this.selectedOption = event.target.value;
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  getObject(formData: any) {

    if (formData.value.firstData !== "" && formData.value.secondData == "") {
      this.medicoService.getReportByReportingDate(formData.value.firstData).subscribe((res) => {
        console.log("GetReportDate", res)
        this.page = res;
        this.dataReports = res.content;
      });
      return this.dataReports;
    }

    if (formData.value.firstData !== "" && formData.value.secondData !== "") {
      this.medicoService.getReportBetweenDate(formData.value.firstData, formData.value.firstData).subscribe((res) => {
        console.log("GetReportInterval:", res)
        this.page = res;
        this.intervallReports = res.content;
      });
      return this.intervallReports;
    }
  }

  InitForm() {
    this.filter = this.fb.group({
      firstData: new FormControl(""),
      secondData: new FormControl(""),

    });
  }

}
