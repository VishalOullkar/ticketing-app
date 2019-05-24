import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RaiseTicketService } from '../Shared/raise-ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { Incident } from '../Models/incident';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-raised-ticket-list',
  templateUrl: './raised-ticket-list.component.html',
  styleUrls: ['./raised-ticket-list.component.css']
})
export class RaisedTicketListComponent implements OnInit {

  config: any;
  IncidentModel: Incident;
  ID: Guid;
  constructor(private raiseTicketService: RaiseTicketService, private route: ActivatedRoute, private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.route.queryParamMap
      .pipe(map(p => p.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  pageChangeMethod(newPage: number) {
    this.router.navigate(['raisedTicketList'], { queryParams: { page: newPage } });

  }

  ShowOrEdit(Incidents: Incident)
  {

    let incidentid = Incidents.IncidentId?Incidents.IncidentId:null;
    //this.raiseTicketService.incidentId = ID;
    this.raiseTicketService.SelectedIncident = Object.assign({}, Incidents);

    this.ID = this.raiseTicketService.SelectedIncident.IncidentId;
    this.ID = Incidents.IncidentId;
    //console.warn(this.ID);

   // console.log(this.raiseTicketService.SelectedIncident);
    //this.parentEvent.emit("Message from parent")
   // this.incidentId = Id;
    this.router.navigate(['/editRaisedTicket', { id: incidentid }]);
  //  console.warn(this.IncidentModel);
  }


  ngOnInit() {

    this.raiseTicketService.getincidentList().subscribe(data => this.raiseTicketService.IncidentList = data);
    //this.raiseTicketService.SelectedIncident.IncidentCode

  }


  }

