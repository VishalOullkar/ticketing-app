import { Component, OnInit, Input, RendererStyleFlags2 } from '@angular/core';
import { RaiseTicketService } from '../../Shared/raise-ticket.service';
import { Incident } from '../../Models/incident';
import { Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Guid } from 'guid-typescript';
import { Router, ParamMap, ActivatedRoute  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Console } from '@angular/core/src/console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-raised-ticket',
  templateUrl: './edit-raised-ticket.component.html',
  styleUrls: ['./edit-raised-ticket.component.css']
})
export class EditRaisedTicketComponent implements OnInit {

 constructor(private raiseTicketService: RaiseTicketService, private fb: FormBuilder,
   private datePipe: DatePipe, private route: ActivatedRoute, private toastrService: ToastrService) { }

 IncidentId: any;
 IncidentModel: Incident;
  emailid: string;
  name: string;

  ConvGroup = this.fb.group({
    ResolveDescription: [''],
    ResponseDescription: [''],
    comment: [''],
    Status: ['']

  });
  get f() {
    return this.ConvGroup.controls;
  }
  reset()
  {
    this.IncidentModel =
      {
      IncidentCode: '',
      Category: '',
      Priority: '',
      ProblemDescription:'',
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
      ModuleName:'',
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
  updateConversation() {
    this.ConvGroup.value.IncidentId = this.IncidentModel.IncidentId;

    this.ConvGroup.value.commentedBy = this.raiseTicketService.name;
 
    this.ConvGroup.value.IncidentId = this.IncidentModel.IncidentId;
    //  this.ConvGroup.value.Status = this.IncidentModel.Status;
    this.ConvGroup.value.IncidentCode = this.IncidentModel.IncidentCode;

    this.raiseTicketService.postIncidentConversation(this.ConvGroup.value)
      .subscribe(data => {
        this.raiseTicketService.getincidentConversationList(this.IncidentId)
          .subscribe(data => this.raiseTicketService.IncidentConvList = data);
      });
    this.toastrService.warning('Updated Successfully');
    this.ConvGroup.reset();
  }

  ngOnInit() {
    this.reset();
    let id1 = this.route.snapshot.paramMap.get('Incidentid');
    let id2;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.IncidentId = params.get('Incidentid');
      console.log(this.IncidentId);
    });

    this.raiseTicketService.getIncidentDetailsById(this.IncidentId)

      .subscribe(res => {
        this.IncidentModel = res;
        console.log(id2);
      })

    this.raiseTicketService.getincidentConversationList(this.IncidentId)
      .subscribe(data => this.raiseTicketService.IncidentConvList = data);

    this.raiseTicketService.GetDocumentDetails(this.IncidentId)
      .subscribe(data => this.raiseTicketService.IncidentDocumentList = data);
  }

  deleteUser(Documentid: any) {
    if (confirm('Are you sure') == true) {
      //let emailid = localStorage.getItem('email');
      //this.userGroup.value.ModifiedBy = emailid;
      this.raiseTicketService.DeleteDocumentDetails(Documentid, this.IncidentId)
        .subscribe(
          data =>
            this.raiseTicketService.IncidentDocumentList = data

        );
      this.toastrService.warning('Deleted successfully');
    }
  }

}
