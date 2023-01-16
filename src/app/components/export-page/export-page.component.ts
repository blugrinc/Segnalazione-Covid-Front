import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-export-page',
  templateUrl: './export-page.component.html',
  styleUrls: ['./export-page.component.scss']
})
export class ExportPageComponent implements OnInit{

  constructor (private medicoService: MedicoService){}

  reports!: any;
  persons!:any;
  page!: any;

  ngOnInit(): void {
   this.medicoService.getReportList(0).subscribe((res)=>{
    console.log(res)
    this.page=res;
    this.reports=res.content;
   });
  }

  getByReportingDate(date : Date){
    this.medicoService.getReportByReportingDate(date).subscribe((res)=>{;
    console.log(res)
    this.page=res;
    this.reports=res.content;
  });
  }

  getReportBetweenDate (minDate :Date, maxDate : Date){
    this.medicoService.getReportBetweenDate(minDate,maxDate).subscribe((res)=>{;
      console.log(res)
      this.page=res;
      this.reports=res.content;
    });
  }

}
