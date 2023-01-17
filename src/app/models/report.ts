import { Person } from "./person";

export interface Report {
  idPerson: number;
  person: Person;
  reportDate: Date;

  triage: boolean;
  abstention: boolean;
  disinfectionDate: boolean;

  newClassification: string;
  oldClassification: string;

  proposedAbstentionDate: Date;

  path: string;

  typeOfReport: string;

  questions1: string;
  questions2: string;
  questions3: string;
  questions4: string;
  questions5: string;
  questions6: string;
  questions7: string;
  questions8: string;

  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  answer6: string;
  answer7: string;
  answer8: string;


}
