import { Person } from "./person";

export interface Report {
  idPerson: number;
  reportingDate: Date;

  triage: boolean;
  abstention: boolean;
  disinfection: boolean;

  newClassification: string;
  oldClassification: string;

  proposedAbstentionDate: Date | string;

  path: string;

  typeOfReport: string;

  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;

  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  answer6: string;
  answer7: string;
  answer8: string;
  //Variables for export Page
  idReport?: number;
  person?: Person;
}
