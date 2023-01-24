import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-path25',
  templateUrl: './path25.component.html',
  styleUrls: ['./path25.component.scss'],
})
export class Path25Component {

  user: any;

  constructor(private authService: AuthService) {}

  async downloadPDF() {
    this.authService.user$.subscribe((res) =>{
      this.user = res?.user.id
    });
    const div = document.getElementById('divPDF')!;
    const doc = new jsPDF('p', 'pt', 'letter');
    await doc.html(div);
    doc.save(`user${this.user}-report.pdf`);
  }
}
