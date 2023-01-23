import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/service/medico.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-export-page',
  templateUrl: './export-page.component.html',
  styleUrls: [ './export-page.component.scss' ],
})
export class ExportPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  reports!: any;
  dataReports!: any;
  intervalReports!: any;

  persons!: any;
  page!: any;

  filter!: FormGroup;
  selectedOption!: string;

  ngOnInit(): void {
    this.InitForm();
    this.medicoService.getReportList().subscribe((res) => {
      console.log('GetAllReport', res);
      this.page = res;
      this.reports = res.content;
    });
  }

  handleSelectChange(event: any) {
    this.selectedOption = event.target.value;
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  getAllReport() {
    this.medicoService.getReportList().subscribe((res) => {
      console.log("GetAllReport", res)
      this.page = res;
      this.reports = res.content;
    });
  }

  getDate(formData: any) {
    this.medicoService
      .getReportByReportingDate(formData.value.firstData)
      .subscribe((res) => {
        console.log('GetReportDate', res);
        this.page = res;
        this.dataReports = res.content;
      });
    this.filter.reset();
  }

  getInterval(formData: any) {
    this.medicoService
      .getReportBetweenDate(formData.value.firstData, formData.value.secondData)
      .subscribe((res) => {
        console.log('GetReportInterval', res);
        this.page = res;
        this.intervalReports = res.content;
      });
    this.filter.reset();
  }

  InitForm() {
    this.filter = this.fb.group({
      firstData: new FormControl(""),
      secondData: new FormControl(""),

    });
  }
}
