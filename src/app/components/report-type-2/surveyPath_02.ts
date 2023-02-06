import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Report } from 'src/app/models/report';
import { ComponentService } from 'src/app/service/components.service';
import { ActivatedRoute, Router } from '@angular/router';

const jsonData = require('../../../assets/Json/JsonSurvey.json');
@Component({
  selector: 'survey_02',
  templateUrl: './surveyPath_02.html',
  styleUrls: [ './surveyPath_02.scss' ],
})


export class surveyPath_02 implements OnInit {
  id!: number;
  form!: FormGroup;
  report!: Report;
  page: number = 1;
  survey = jsonData.reportType2

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  next() {
    this.page++
  }

  sendObject(formData: any) {
    this.componentService.sendSurvey(formData.value)
  }

  ngOnInit(): void {
    this.InitForm();
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

      question4: new FormControl(this.survey.question4),
      answer4: new FormControl(''),

      question5: new FormControl(this.survey.question5),
      answer5: new FormControl(''),

      question6: new FormControl(this.survey.question6),
      answer6: new FormControl(''),
    });
  }
}


