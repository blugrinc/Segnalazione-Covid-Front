import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/auth/auth.service';
import { ComponentService } from 'src/app/service/components.service';

@Component({
  selector: 'app-path1',
  templateUrl: './path1.component.html',
  styleUrls: ['./path1.component.scss']
})
export class Path1Component implements OnInit {

  user: any;
  datiUser: any;

  constructor(
    private authService: AuthService,
    private componentService: ComponentService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.user$.subscribe((res) => {
      this.user = res;
    });
    this.componentService
      .getPerson(this.user!.user.fiscalCode)
      .subscribe((res) => {
        this.datiUser = res;
      });
  }

  downloadPDF(): void {
    html2canvas(document.getElementById('divPDF')!, {
      allowTaint: true,
      useCORS: false,
      scale: 1,
    }).then((canvas) => {
      let img = canvas.toDataURL('src/assets/IMG/logo-intesasanpaolo.png');
      let doc = new jsPDF();
      let surname = this.datiUser.surname;
      let surnameLC = surname.toLowerCase();
      doc.addImage(img, 'PNG', 5, 5, 200, 275);
      doc.save(`report-${surnameLC}.pdf`);
    });
  }
}
