import { Guid } from 'guid-typescript';

export class Incidentconversation {

  ID: number; 
  IncidentCode: string; 
  RaisedBy: string;
  ResolveDescription: string;
  ResponseBy: string;
  ResponseDescription:string 
  Status: string;
  createdDate: Date;
  IncidentId: Guid;
  commentedBy: string;
  comment: string;

}
