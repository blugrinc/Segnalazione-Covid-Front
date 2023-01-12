import { Report } from "./report";
import { PersonRole } from "./personRole";

export interface Person {
  fiscalCode: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  roles: PersonRole;
  listReport: Report[];

}
