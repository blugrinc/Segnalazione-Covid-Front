import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})

export class AdminPageComponent implements OnInit {

  constructor(private adminService: AdminService) {}

  page: any;
  reports!: Report;

  ngOnInit(): void {
    this.adminService.getReportList().subscribe((res) => {
      console.log('GetAllReport', res);
      this.page = res;
      this.reports = res.content;
    });
  }

}
