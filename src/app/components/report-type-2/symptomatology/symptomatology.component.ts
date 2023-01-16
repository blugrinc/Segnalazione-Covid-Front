import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/models/report';
import { ComponentService } from 'src/app/service/components.service';
import { ActivatedRoute, Router } from '@angular/router';

const jsonData = require('../../../../assets/Json/JsonSurvey.json');

@Component({
  selector: 'app-symptomatology',
  templateUrl: './symptomatology.component.html',
  styleUrls: [ './symptomatology.component.scss' ]
})
export class type2_SymptomatologyComponent {
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
    this.componentService.getSurvey_2(formData.value)
    console.log(formData.value);
    this.router.navigate([ '/control-data:2' ]);

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params[ 'id' ]
      this.InitForm();
    });
  }

  InitForm() {
    this.form = this.fb.group({
      question4: new FormControl(this.survey.question4),
      answer4: new FormControl(''),

      question5: new FormControl(this.survey.question5),
      answer5: new FormControl(''),


    });
  }
}
