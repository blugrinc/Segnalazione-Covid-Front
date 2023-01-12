import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/models/report';
import { ComponentService } from 'src/app/service/components.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-control-data',
  templateUrl: './control-data.component.html',
  styleUrls: [ './control-data.component.scss' ]
})

export class type1_ControlDataComponent implements OnInit {
  id: number = 2;
  form!: FormGroup;
  report!: Report;

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  sendObject(formData: any) {
    this.componentService.getSurvey_3(formData.value)

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params[ 'id' ];
      this.InitForm();
    });
  }

  InitForm() {
    this.form = this.fb.group({
      question7: new FormControl('Se conosci la data di effettuazione del tampone di controllo indicala di seguito:'),
      answer7: new FormControl(''),

      question8: new FormControl('Il tuo è un caso sospetto o confermato di variante?'),
      answer8: new FormControl(''),

    });
  }

}
