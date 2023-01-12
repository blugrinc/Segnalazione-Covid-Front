import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/models/report';
import { ComponentService } from 'src/app/service/components.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: [ './survey.component.scss' ],
})


export class type1_SurveyComponent implements OnInit {
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
    /*   const proposedAbstentionDate = new Date(formData.value.answer2)
      proposedAbstentionDate.setDate(proposedAbstentionDate.getDate() + 14) */
    this.componentService.getSurvey_1(formData.value)


    if (formData.value.answer4 === "si") {
      this.router.navigate([ '/symptomatology:1' ]);
    } else {
      this.router.navigate([ '/control-data:1' ]);
    }

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params[ 'id' ]
      this.InitForm();
    });
  }

  InitForm() {
    this.form = this.fb.group({
      typeOfReport: new FormControl("Sono positivo ad un test diagnostico"),
      question1: new FormControl('Selezionare la tipologia di test'),
      answer1: new FormControl(''),

      question2: new FormControl('Data in cui il test è stato effettuato'),
      answer2: new FormControl(''),

      question3: new FormControl('Data ultima presenza in sede/ufficio'),
      answer3: new FormControl(''),

      question4: new FormControl('Sei sintomatico?'),
      answer4: new FormControl(''),

    });
  }
}


