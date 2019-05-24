import { Injectable } from '@angular/core';
import { Http, RequestMethod, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Incident } from '../Models/incident';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { Incidentconversation } from '../Models/incidentconversation';
import { debug } from 'util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RaiseTicketService {

  public IncidentList: Incident[];
  public IncidentConvList: Incidentconversation[];
  public SelectedIncident: Incident;
  public incidentId: Guid;
  Raisedate:any;

  constructor(private httpClient: HttpClient, private http: Http) {
   
  }




  getincidentId() {
    data => this.incidentId = data;
  }

  getincidentList(): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>('api/Incidents/GetIncidents');
  }
  getincidentConversationList(Id:Guid): Observable<Incidentconversation[]> {
    return this.httpClient.get<Incidentconversation[]>('api/IncidentConversations/GetConversationListById/'+Id);
  }
  getNextIncidentId(): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>('api/Incidents/GetNextIncidentId');
  }

  getIncidentDetailsById(Id: Guid): Observable<Incident> {
    return this.httpClient.get<Incident>('api/Incidents/GetIncidentById/'+Id);
  }

  

  postStatus(IncidentModel: any)
  {
    var body = JSON.stringify(IncidentModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: hearderOptions });
    return this.http.post('api/Incidents/PostIncidentStatus', body, requestOptions).pipe(map(res => res.json)) 
  }

  postIncidentDetails(IncidentModel: Incident) {

    var body = JSON.stringify(IncidentModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: hearderOptions });
   return this.http.post('api/Incidents/PostIncidentStatus', body, requestOptions).pipe(map(res => res.json));
  
  }
  postIncidentConversation(conversationtModel: Incidentconversation) { 

    var body = JSON.stringify(conversationtModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: hearderOptions });
    return this.http.post('api/IncidentConversations/PostIncidentConversation', body, requestOptions).pipe(map(res => res.json));
  
  }


  Postraisticket(files, raisdata: Incident) {
    const formData = new FormData();

    for (let file of files) {
      formData.append(file.name, file);
    }
    formData.append('ModuleName', raisdata.ModuleName);
    formData.append('ProblemDescription', raisdata.ProblemDescription);
    formData.append('Priority', raisdata.Priority);
    this.Raisedate = raisdata.RaisedDateTime;
    formData.append('RaisedDateTime', this.Raisedate );
    formData.append('RaisedBy', raisdata.RaisedBy);
    formData.append('Status', raisdata.Status);
    formData.append('Category', raisdata.Category);


    const uploadReq = new HttpRequest('POST', 'api/Incidents/upload', formData, {
      reportProgress: true,
    });
    this.httpClient.request(uploadReq).subscribe();
      
  }




  putIncidentDetails(id: Guid, IncidentModel: Incident) {

    var body = JSON.stringify(IncidentModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: hearderOptions });
    return this.http.put('http://localhost:59090/api/Incidents/PutIncident' + id, body, requestOptions).pipe(map(res => res.json));
  }
  GetRaiseDetailsByStatus(Status:any): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>('api/Incidents/GetRaiseticketbystatus/' + Status);
  }
 }
