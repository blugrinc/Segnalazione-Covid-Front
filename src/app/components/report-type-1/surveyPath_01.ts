import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/models/report';
import { ComponentService } from 'src/app/service/components.service';
import { ActivatedRoute, Router } from '@angular/router';

const jsonData = require('../../../assets/Json/JsonSurvey.json');
@Component({
  selector: 'survey_01',
  templateUrl: './surveyPath_01.html',
  styleUrls: [ './surveyPath_01.scss' ],
})


export class surveyPath_01 implements OnInit {
  id!: number;
  form!: FormGroup;
  report!: Report;
  page: number = 1;
  survey = jsonData.reportType1

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  next() {
    const controlAnswer = this.form.get('answer4')?.value;
    if (controlAnswer === "NO" || controlAnswer === "") {
      this.page += 2
    } else this.page++
  }

  sendObject(formData: any) {
    console.log(formData.value)
    this.componentService.sendSurvey(formData.value)
  }

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm() {
    this.form = this.fb.group({
      typeOfReport: new FormControl("SONO_POSITIVO_AD_UN_TEST_DIAGNOSTICO"),
      question1: new FormControl(this.survey.question1),
      answer1: new FormControl(''),

      question2: new FormControl(this.survey.question2),
      answer2: new FormControl('', Validators.required),

      question3: new FormControl(this.survey.question3),
      answer3: new FormControl('', Validators.required),

      question4: new FormControl(this.survey.question4),
      answer4: new FormControl('', Validators.required),

      question5: new FormControl(this.survey.question5),
      answer5: new FormControl(''),

      question6: new FormControl(this.survey.question6),
      answer6: new FormControl(''),

      question7: new FormControl(this.survey.question7),
      answer7: new FormControl(''),

      question8: new FormControl(this.survey.question8),
      answer8: new FormControl(''),
    });
  }
}


