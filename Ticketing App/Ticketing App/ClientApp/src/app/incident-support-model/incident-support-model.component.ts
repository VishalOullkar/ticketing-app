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
  isEditable: boolean = true;
  IncidentModel: Incident;
  incidentId: any;
  
  constructor(private raiseTicketService: RaiseTicketService,private fb:FormBuilder,
    public ngxSmartModalService: NgxSmartModalService,
    private toastrService: ToastrService, private router: ActivatedRoute) {

    this.router.paramMap
      .subscribe((param: ParamMap) => { this.incidentId = param.get('Incidentid') });

    this.raiseTicketService.getIncidentDetailsById(this.incidentId)
      .subscribe(res => {
        this.IncidentModel = res;
        //   console.log(this.IncidentModel);

        this.raiseTicketService.getincidentConversationList(this.IncidentModel.IncidentId)
          .subscribe(data => this.raiseTicketService.IncidentConvList = data);
      })



    this.raiseTicketService.GetDocumentDetails(this.incidentId)
      .subscribe(data => this.raiseTicketService.IncidentDocumentList = data);
  }

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

    if (this.isResove == true) {
      this.ConvGroup.value.ResolveDescription = this.ConvGroup.value.comment;
    }
    else {
      this.ConvGroup.value.ResponseDescription = this.ConvGroup.value.comment;
    }

    this.ConvGroup.value.IncidentId = this.IncidentModel.IncidentId;
    this.ConvGroup.value.IncidentCode = this.IncidentModel.IncidentCode;



    this.raiseTicketService.postIncidentConversation(this.ConvGroup.value)
      .subscribe(data =>
      {
        this.raiseTicketService.getincidentConversationList(this.incidentId)
          .subscribe(data => this.raiseTicketService.IncidentConvList = data);
      });
    this.toastrService.warning('Updated Successfully');
    this.ConvGroup.reset();
  }
 
  updateStatus(statusform:NgForm)
  {

    this.raiseTicketService.postIncidentDetails(statusform.value).subscribe();
  }

  ConvGroup = this.fb.group({
    ResolveDescription: [''],
    ResponseDescription: [''],
    comment: [''],
    Status: ['']

  });

  deleteUser(ID: number) {
    if (confirm('Are you sure') == true) {
      //let emailid = localStorage.getItem('email');
      //this.userGroup.value.ModifiedBy = emailid;
      //this.userService.deleteuser(ID, this.userGroup.value)
      //  .subscribe(
      //    data =>
      //      this.userService.getusersList()
      //        .subscribe(data => this.userService.userList = data)

      //  );
      this.toastrService.warning('Deleted successfully');
    }
  }
  
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
       FilePath: '',
      MobileNo: null,
      Emailid: ''

      }
  }
  ngOnInit() {
 
    this.reset();


 
  }

}
