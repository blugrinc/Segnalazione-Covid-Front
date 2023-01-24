import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-path25',
  templateUrl: './path25.component.html',
  styleUrls: [ './path25.component.scss' ],
})
export class Path25Component {

  user: any

  constructor(private authService: AuthService) { }

  async downloadPDF() {
    this.authService.user$.subscribe((res) => {
      this.user = res?.user.id
    });
    const pageOne = document.querySelector('#pageOne') as HTMLSelectElement;
    const pageTwo = document.querySelector('#pageTwo') as HTMLSelectElement;

    const doc = new jsPDF('p', 'px', [ 1200, 800 ]);
    await doc.html(pageOne);
    doc.addPage();
    await doc.html(pageTwo);
    doc.save(`user${this.user}-report.pdf`);


  }
}
