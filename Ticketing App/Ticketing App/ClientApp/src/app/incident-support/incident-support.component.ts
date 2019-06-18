import { Component, OnInit } from '@angular/core';
import { RaiseTicketService } from '../Shared/raise-ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from '../Models/incident';
import { map } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-incident-support',
  templateUrl: './incident-support.component.html',
  styleUrls: ['./incident-support.component.css']
})
export class IncidentSupportComponent implements OnInit {

  //searchTerm: string;
  isResove: boolean = false;
  isResponse: boolean = false;


  config: any;
  IncidentModel: Incident;
  constructor(private raiseTicketService: RaiseTicketService, public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute,private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 8
    };
    this.route.queryParamMap
      .pipe(map(p => p.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  pageChangeMethod(newPage: number) {
    this.router.navigate(['incidentSupport'], { queryParams: { page: newPage } });

  }
  onChange(Status: any) {
    this.raiseTicketService.GetRaiseDetailsByStatus(Status).subscribe(datalist => this.raiseTicketService.IncidentList = datalist);

  }
   
  reset() {
    this.IncidentModel =
      {
        IncidentCode: '',
        Category: '',
        Priority: '',
        ProblemDescription: '',
        RaisedDateTime: null,
        RaisedBy: '',
        ResolveDescription: '',
        ResolvedDateTime: null,
        ResolvedBy: '',
        ResponseDescription: '',
        ResponseDateTime: null,
        ResponseBy: '',
        Status: '',
        RaisedByName: '',
        ModuleName: '',
        Link: '',
        ConfirmBy: '',
        ConfirmDateTime: null,
        IncidentId: null,
        FileName: '',
        FilePath: '',
      MobileNo: null,
      Emailid:''

      }
  }




  ShowOrEdit(Id: any) {

    let incidentid = Id ? Id: null;
    this.router.navigate(['/supportModel/', { Incidentid: incidentid}]);

  }
  
  ngOnInit() {
    this.reset();
    this.raiseTicketService.getincidentList()
      .subscribe(data => this.raiseTicketService.IncidentList = data);

  }




}
