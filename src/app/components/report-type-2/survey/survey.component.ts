import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/models/report';
import { ComponentService } from 'src/app/service/components.service';
import { ActivatedRoute, Router } from '@angular/router';


const jsonData = require('../../../../assets/Json/JsonSurvey.json');

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: [ './survey.component.scss' ]
})

export class type2_SurveyComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  report!: Report;
  survey = jsonData.reportType2

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  sendObject(formData: any) {
    this.componentService.getSurvey_1(formData.value)
    console.log(formData.value);
    this.router.navigate([ '/symptomatology:2' ]);

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params[ 'id' ]
      this.InitForm();
    });
  }

  InitForm() {
    this.form = this.fb.group({
      typeOfReport: new FormControl("AGGIORNAMENTO_PER_RICHIESTA_FINE_ASTENSIONE"),
      question1: new FormControl(this.survey.question1),
      answer1: new FormControl(''),

      question2: new FormControl(this.survey.question2),
      answer2: new FormControl(''),

      question3: new FormControl(this.survey.question3),
      answer3: new FormControl(''),
    });
  }
}
