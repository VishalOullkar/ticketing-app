import { Guid } from "guid-typescript";

export class Incident {

  IncidentCode: string;
  Category: string;
  Priority: string;
  ProblemDescription: string;
  RaisedDateTime: Date;
  RaisedBy: string;
  ResolveDescription: string;
  ResolvedDateTime: Date;
  ResolvedBy: string;
  ResponseDescription
  ResponseDateTime: Date;
  ResponseBy: string;
  Status: string;
  RaisedByName: string;
  ModuleName: string;
  Link: string;
  ConfirmBy: string;
  ConfirmDateTime: Date;
  IncidentId: Guid;
  FileName: string;
  FilePath: string;
  MobileNo: string;
  Emailid: string;

}
