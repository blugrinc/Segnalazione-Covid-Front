import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/service/medico.service';
import { NgbModal, NgbModalModule, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-export-page',
  templateUrl: './export-page.component.html',
  styleUrls: [ './export-page.component.scss' ]
})
export class ExportPageComponent implements OnInit {

  constructor(
    private medicoService: MedicoService,
    private modalService: NgbModal,
    config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  reports = [
    {
      id: 25,
      reportDate: "16/01/2023",
      person: {
        name: "Luca",
        surname: "Grillo",
      },
      typeOfReport: "SONO MORTO",
      reportingDate: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
    },

    {
      id: 1,
      reportDate: "15/01/2023",
      person: {
        name: "Marco",
        surname: "Friggido",
      },
      typeOfReport: "SONO POSITIVO",
      reportingDate: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
    },

    {
      id: 524,
      reportDate: "14/01/2023",
      person: {
        name: "Cane",
        surname: "Pelato",
      },
      typeOfReport: "SONO POSITIVO",
      reportingDate: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
    },
  ];

  persons!: any;
  page!: any;

  ngOnInit(): void {
    this.medicoService.getReportList(0).subscribe((res) => {
      console.log(res)
      this.page = res;
      this.reports = res.content;
    });
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  getByReportingDate(date: Date) {
    this.medicoService.getReportByReportingDate(date).subscribe((res) => {
      ;
      console.log(res)
      this.page = res;
      this.reports = res.content;
    });
  }

  getReportBetweenDate(minDate: Date, maxDate: Date) {
    this.medicoService.getReportBetweenDate(minDate, maxDate).subscribe((res) => {
      ;
      console.log(res)
      this.page = res;
      this.reports = res.content;
    });
  }

}
