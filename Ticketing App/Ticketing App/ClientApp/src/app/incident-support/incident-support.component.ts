import { Component, OnInit } from '@angular/core';
import { RaiseTicketService } from '../Shared/raise-ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from '../Models/incident';
import { map } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { SidebarService } from '../sidebar/sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private route: ActivatedRoute, private toastrService: ToastrService, private fb: FormBuilder,
    private router: Router, private sidebarService: SidebarService, private modalService: NgbModal) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
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
    //  console.log(this.config);
  }
 // getIncidentByID(ID: Guid) {
 //   this.raiseTicketService.getIncidentDetailsById(ID)
 //     .subscribe(data => this.raiseTicketService.SelectedIncident = data);
 //   this.ngxSmartModalService.getModal('popupOne').open();
 //}

  

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
        FilePath: ''

      }
  }




  ShowOrEdit(Id: any) {
    //this.raiseTicketService.incidentId = ID;
    //    this.raiseTicketService.SelectedIncident = Object.assign({}, Incidents);
    //this.raiseTicketService.getincidentConversationList(Id)
    //  .subscribe(data => this.raiseTicketService.IncidentConvList = data);
    //console.log(Id);
    //  console.log(content);
    //this.parentEvent.emit("Message from parent")
    // this.incidentId = Id;
    //this.router.navigate(['/editRaisedTicket'])
    //  console.warn(this.IncidentModel);
    //this.openLg(content);

    let incidentid = Id ? Id: null;
    this.router.navigate(['/supportModel/', { ID: incidentid}]);
    //this.raiseTicketService.getIncidentDetailsById(Id)
    //  // .subscribe(data => this.IncidentModel === data);
    //  //   .subscribe(x => console.log(x));
    //  .subscribe(res => {
    //    this.IncidentModel = res;
    //    //   console.log(this.IncidentModel);
    //  })
    //  this.checkStatus()
  }
  toggleSidebar() {
    this.sidebarService.setSidebarState(!this.sidebarService.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarService.hasBackgroundImage = !this.sidebarService.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarService.getSidebarState();
  }

  hideSidebar() {
    this.sidebarService.setSidebarState(true);
  }
  ngOnInit() {
    //this.hideSidebar();
    this.reset();
    this.raiseTicketService.getincidentList()
      .subscribe(data => this.raiseTicketService.IncidentList = data);

    //console.log(item);

    //console.warn(data => this.raiseTicketService.IncidentList = data);

  }

  //openLg(content) {
  //  this.modalService.open(content, { size: 'lg' });
  //}


}
