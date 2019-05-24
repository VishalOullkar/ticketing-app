import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { RaiseTicketService } from '../Shared/raise-ticket.service';
import { Guid } from 'guid-typescript';
import { Incident } from '../Models/incident';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-incident-support-model',
  templateUrl: './incident-support-model.component.html',
  styleUrls: ['./incident-support-model.component.scss']
})
export class IncidentSupportModelComponent implements OnInit {

  isResove: boolean = false;
  isResponse: boolean = false;
  Category: string;
  IncidentModel: Incident;
  constructor(private raiseTicketService: RaiseTicketService,private fb:FormBuilder,
    public ngxSmartModalService: NgxSmartModalService,
    private toastrService: ToastrService,private router: ActivatedRoute) { }

  checkStatus(value: string)
  {
    if (value == 'Response')
    {
    this.isResponse = true;
      this.isResove = false;
    }
    if (value == 'Resolve') {
      this.isResove = true;
      this.isResponse = false;
    }

  }


  updateConversation() {
    let userid = localStorage.getItem('username');
    this.ConvGroup.value.commentedBy = userid;
    this.ConvGroup.value.IncidentId = this.IncidentModel.IncidentId;
  //  this.ConvGroup.value.Status = this.IncidentModel.Status;
    this.ConvGroup.value.IncidentCode = this.IncidentModel.IncidentCode;

    let incidentId;
    this.router.paramMap
      .subscribe((param: ParamMap) => { incidentId = param.get('ID') });

    this.raiseTicketService.postIncidentConversation(this.ConvGroup.value)
      .subscribe(data =>
      {
        this.raiseTicketService.getincidentConversationList(incidentId)
          .subscribe(data => this.raiseTicketService.IncidentConvList = data);
      });
    this.toastrService.warning('Updated Successfully');
    this.ConvGroup.reset();
   // this.modalService.dismissAll();
  }
 
  updateStatus(statusform:NgForm)
  {

    this.raiseTicketService.postIncidentDetails(statusform.value).subscribe();
 //   this.ngxSmartModalService.getModal('popupOne').close();
  }

  ConvGroup = this.fb.group({
    ResolveDescription: [''],
    ResponseDescription: [''],
    Status: ['']

  });


  
  get f() {
    return this.ConvGroup.controls;
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
        FilePath: ''

      }
  }
  ngOnInit() {
    //this.resetdata()
    //if (this.raiseTicketService.SelectedIncident.IncidentId != null)
    //{
    //   this.raiseTicketService.getIncidentDetailsById(this.raiseTicketService.SelectedIncident.IncidentId)
    // .subscribe(data => this.raiseTicketService.SelectedIncident = data);
    //}
    //this.reset();
    //this.raiseTicketService.getincidentList()
    //  .subscribe(data => this.raiseTicketService.IncidentList = data);

    this.reset();
    let incidentId;
    this.router.paramMap
      .subscribe((param: ParamMap) => { incidentId= param.get('ID')});

    this.raiseTicketService.getIncidentDetailsById(incidentId)
      .subscribe(res => {
        this.IncidentModel = res;
        //   console.log(this.IncidentModel);

        this.raiseTicketService.getincidentConversationList(incidentId)
          .subscribe(data => this.raiseTicketService.IncidentConvList = data);
      })

    this.raiseTicketService.getincidentConversationList(incidentId)
      .subscribe(data => this.raiseTicketService.IncidentConvList = data);
    //console.log(Id);

  }

}
