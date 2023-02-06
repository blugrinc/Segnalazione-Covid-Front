import { Survey } from './survey';
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

  proposedAbstentionDate: object;

  path: string;

  survey: Survey,
}
