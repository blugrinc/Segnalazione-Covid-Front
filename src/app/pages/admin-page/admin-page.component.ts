import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { Report } from 'src/app/models/report';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: [ './admin-page.component.scss' ],
})

export class AdminPageComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  //Person
  persons!: Person[];

  //Report
  reports!: Report[];
  dataReports!: any;
  intervalReports!: any;

  //Page
  page: number = 0;
  totalPages: number = 10;

  /*   filter!: FormGroup; */
  selectedOption!: string;

  ngOnInit() {
    this.adminService.getAllPerson(this.page).subscribe((res) => {
      console.log("GetAllPerson", res);
      this.persons = res.content;
    })
  }

  get paginationPersons() {
    if (this.persons) {
      const startIndex = (this.page) * this.totalPages;
      const endIndex = startIndex + this.totalPages;
      return this.persons.slice(startIndex, endIndex);
    } else return this.persons
  }


  get personReportStatus() {
    this.persons.forEach(singlePerson => {
      if (singlePerson.reportList.length != 0) {
        singlePerson.reportList.some(report => {
          if (report.status === 'VALIDO') {
            return "green"
          }
          return "red"
        })
      }
    })
    return 'yellow'
  }

  get personReportText() {
    this.persons.forEach(singlePerson => {
      if (singlePerson.reportList.length != 0) {
        singlePerson.reportList.some(report => {
          if (report.status === 'VALIDO') {
            return "GUARITO"
          }
          return "QUARANTENA"
        })
      }
    })
    return "PENDING"
  }


  previousPage() {
    this.page = this.page - 1
  }

  nextPage() {
    this.page = this.page + 1
  }

  handleSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    switch (target.value) {
      case 'option1':
        return this.ngOnInit();
      case 'option2':
        return this.adminService.getAllRecovered(this.page).subscribe((res) => {
          console.log("getAllRecovered", res);
          this.persons = res.content;
        })
      case 'option3':
        return this.adminService.getAllPositive(this.page).subscribe((res) => {
          console.log("getAllPositive", res);
          this.persons = res.content;
        })
    }
  }
}
