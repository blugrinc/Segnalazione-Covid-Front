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
  totalPages: number = 0;

  /*   filter!: FormGroup; */
  selectedOption!: string;

  ngOnInit(): void {
    /*  this.adminService.getReportList().subscribe((res) => {
       console.log('GetAllReport', res);
       this.page = res;
       this.reports = res.content;
     }); */

    this.adminService.getAllPerson(this.page).subscribe((res) => {
      console.log("GetAllPerson", res);
      this.totalPages = res.totalPages;
      this.persons = res.content;
    })
  }


  previousPage() {
    this.page = this.page - 1
    return this.ngOnInit();
  }

  nextPage() {
    this.page = this.page + 1
    return this.ngOnInit();
  }

  handleSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    switch (target.value) {
      case 'option1':
        return this.ngOnInit();
      case 'option2':
        return console.log("ciao oprzione 2");
      case 'option3':
        return console.log("ciao oprzione 3");
    }
  }
}
