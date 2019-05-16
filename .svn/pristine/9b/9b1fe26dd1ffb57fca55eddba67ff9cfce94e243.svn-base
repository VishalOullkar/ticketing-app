import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgForm } from '@angular/forms';
import { RaiseTicketService } from '../Shared/raise-ticket.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-incident-support-model',
  templateUrl: './incident-support-model.component.html',
  styleUrls: ['./incident-support-model.component.css']
})
export class IncidentSupportModelComponent implements OnInit {

  isResove: boolean = false;
  isResponse: boolean = false;

  constructor(private raiseTicketService: RaiseTicketService, public ngxSmartModalService: NgxSmartModalService) { }

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



  updateStatus(statusform:NgForm)
  {
    this.raiseTicketService.postStatus(statusform.value);
    console.log(statusform.value);
    this.ngxSmartModalService.getModal('popupOne').close();
  }

  resetdata(form?: NgForm) {
    if (form != null)
      form.reset()

    this.raiseTicketService.SelectedIncident =
      {
      Status:"",
      ResolveDescription:"",
      ResponseDescription:"",
      IncidentCode: "",
      Category: "",
      Priority: "",
      ProblemDescription: "",
      RaisedDateTime: null,
      RaisedBy: "",
      ResolvedDateTime: null,
      ResolvedBy: "",
      ResponseDateTime: null,
      ResponseBy: "",
      RaisedByName: "",
      ModuleName: "",
      Link: "",
      ConfirmBy: "",
      ConfirmDateTime: null,
      IncidentId: null,
      FileName: "",
      FilePath:""





      }
  }

  ngOnInit() {
    this.resetdata()
    if (this.raiseTicketService.SelectedIncident.IncidentId != null)
    {
       this.raiseTicketService.getIncidentDetailsById(this.raiseTicketService.SelectedIncident.IncidentId)
     .subscribe(data => this.raiseTicketService.SelectedIncident = data);
    }


  }

}
