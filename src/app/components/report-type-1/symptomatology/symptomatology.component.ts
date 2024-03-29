import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/models/report';
import { ComponentService } from 'src/app/service/components.service';
import { ActivatedRoute, Router } from '@angular/router';

const jsonData = require('../../../../assets/Json/JsonSurvey.json');
@Component({
  selector: 'app-symptomatology',
  templateUrl: './symptomatology.component.html',
  styleUrls: [ './symptomatology.component.scss' ],
})
export class type1_SymptomatologyComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  report!: Report;
  survey = jsonData.reportType1

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  sendObject(formData: any) {
    this.componentService.getSurvey_2(formData.value)
    this.router.navigate([ '/control-data:1' ]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params[ 'id' ];
      this.InitForm();
    });
  }

  InitForm() {
    this.form = this.fb.group({
      question5: new FormControl(this.survey.question5),
      answer5: new FormControl(''),

      question6: new FormControl(this.survey.question6),
      answer6: new FormControl(''),


    });
  }

}
