import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/models/report';
import { ComponentService } from 'src/app/service/components.service';
import { ActivatedRoute, Router } from '@angular/router';

const jsonData = require('../../../../assets/Json/JsonSurvey.json');

@Component({
  selector: 'app-control-data',
  templateUrl: './control-data.component.html',
  styleUrls: [ './control-data.component.scss' ]
})
export class type2_ControlDataComponent {
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
    this.componentService.getSurvey_3(formData.value)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params[ 'id' ]
      this.InitForm();
    });
  }

  InitForm() {
    this.form = this.fb.group({
      question6: new FormControl(this.survey.question6),
      answer6: new FormControl(''),
    });
  }
}
