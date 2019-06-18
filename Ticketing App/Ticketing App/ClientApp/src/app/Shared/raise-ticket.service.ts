import { Injectable } from '@angular/core';
import { Http, RequestMethod, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Incident } from '../Models/incident';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { Incidentconversation } from '../Models/incidentconversation';
import { debug } from 'util';
import { Employee } from '../Models/employee';
import { IncidentDocuments } from '../Models/incident-documents';

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
  public Email: string;
  public EmployeeList: Employee[];
  Raisedate:any;
  emailid: any;
  name: any;
  URL: string = "http://localhost:59090/";
  public IncidentDocumentList: IncidentDocuments[];
  constructor(private httpClient: HttpClient, private http: Http) {
   
  }


  
  getincidentId() {
    data => this.incidentId = data;
  }



  getincidentList(): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>(this.URL+'api/Incidents/GetIncidents');
  }
  GetUserDetailsByEmailId(EmailId: any): Observable<[Incident]> {
    return this.httpClient.get<[Incident]>(this.URL+'api/Incidents/GetIncidentByEmailId/' + EmailId);
  }

  
  getincidentConversationList(Id:Guid): Observable<Incidentconversation[]> {
    return this.httpClient.get<Incidentconversation[]>(this.URL+'api/IncidentConversations/GetConversationListById/'+Id);
  }
  getNextIncidentId(): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>(this.URL+'api/Incidents/GetNextIncidentId');
  }

  getIncidentDetailsById(Id: Guid): Observable<Incident> {
    return this.httpClient.get<Incident>(this.URL+'api/Incidents/GetIncidentById/'+Id);
  }

  

  postStatus(IncidentModel: any)
  {
    var body = JSON.stringify(IncidentModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: hearderOptions });
    return this.http.post(this.URL+'api/Incidents/PostIncidentStatus', body, requestOptions).pipe(map(res => res.json)) 
  }

  postIncidentDetails(IncidentModel: Incident) {

    var body = JSON.stringify(IncidentModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: hearderOptions });
    return this.http.post(this.URL+'api/Incidents/PostIncidentStatus', body, requestOptions).pipe(map(res => res.json));
  
  }
  postIncidentConversation(conversationtModel: Incidentconversation) { 

    var body = JSON.stringify(conversationtModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: hearderOptions });
    return this.http.post(this.URL+'api/IncidentConversations/PostIncidentConversation', body, requestOptions).pipe(map(res => res.json));
  
  }


  Postraisticket(files, raisedata: Incident) {
    const formData = new FormData();

    for (let file of files) {
      formData.append(file.name, file);
    }
    formData.append('ModuleName', raisedata.ModuleName);
    formData.append('ProblemDescription', raisedata.ProblemDescription);
    formData.append('Priority', raisedata.Priority);
    this.Raisedate = raisedata.RaisedDateTime;
    formData.append('RaisedDateTime', this.Raisedate );
    formData.append('RaisedBy', raisedata.RaisedBy);
    formData.append('Status', raisedata.Status);
    formData.append('Category', raisedata.Category);
    formData.append('Emailid', raisedata.Emailid);
    formData.append('MobileNo', raisedata.MobileNo);



    const uploadReq = new HttpRequest('POST', this.URL+'api/Incidents/upload', formData, {
      reportProgress: true,
    });
    this.httpClient.request(uploadReq).subscribe();
      
  }




  putIncidentDetails(id: Guid, IncidentModel: Incident) {

    var body = JSON.stringify(IncidentModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: hearderOptions });
    return this.http.put(this.URL+'api/Incidents/PutIncident' + id, body, requestOptions).pipe(map(res => res.json));
  }
  GetRaiseDetailsByStatus(Status:any): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>(this.URL+'api/Incidents/GetRaiseticketbystatus/' + Status);
  }

  GetDocumentDetails(IncidentId: Guid): Observable<IncidentDocuments[]> {
    return this.httpClient.get<IncidentDocuments[]>(this.URL + 'api/Incidents/GetRaiseTicketDocuments/' + IncidentId);
  }

  DeleteDocumentDetails(Documentid: Guid, IncidentId: Guid): Observable<IncidentDocuments[]> {
    return this.httpClient.delete<IncidentDocuments[]>(this.URL + 'api/Incidents/DeleteIncidentDocument/' + Documentid + '/' + IncidentId);
  }

 }
