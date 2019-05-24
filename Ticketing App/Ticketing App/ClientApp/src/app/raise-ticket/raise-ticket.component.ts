import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'guid-typescript';
import { RaiseTicketService } from '../Shared/raise-ticket.service';

import { HttpRequest, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css']
})
export class RaiseTicketComponent implements OnInit {

  submitted = false;
  NewIncidentId: Guid;
  constructor(private raiseTicketService: RaiseTicketService,
    private fb: FormBuilder, private datePipe: DatePipe, private toastrService: ToastrService, private http: HttpClient) { }
  IncidentCode: string;
  ngOnInit() {

    //this.raiseTicketService.getincidentDetails().subscribe(data => this.raiseTicketService.IncidentList = data);
    this.raiseTicketService.getNextIncidentId().subscribe(data => this.raiseTicketService.IncidentList = data);
    console.warn(this.raiseTicketService.IncidentList);
    //    console.warn(this.raiseTicketService.SelectedIncident.IncidentCode);


    //this.IncidentCode = this.raiseTicketService.SelectedIncident.IncidentId;

  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid

    if (this.raiseTicketGroup.invalid) {
      return;
    }
    if (this.raiseTicketGroup.value.IncidentId == null) {
      this.NewIncidentId = Guid.create();
      this.raiseTicketGroup.value.IncidentId = this.NewIncidentId.toJSON;
      this.raiseTicketService.postIncidentDetails(this.raiseTicketGroup.value).subscribe(
        data => {
          this.raiseTicketGroup.reset();
          this.raiseTicketService.getNextIncidentId().subscribe(data => this.raiseTicketService.IncidentList = data);
          this.toastrService.success('Submitted successfully', 'Success');


        }
      );
    }
    else {
      this.raiseTicketService.putIncidentDetails(this.raiseTicketGroup.value.IncidentId, this.raiseTicketGroup.value).subscribe(
        data => {
          this.raiseTicketGroup.reset();
          this.raiseTicketService.getNextIncidentId().subscribe(data => this.raiseTicketService.IncidentList = data);
          this.toastrService.success('Updated successfully', 'Success');
        }
      );
    }
  }

  get fc() { return this.raiseTicketGroup.controls }

  onSave(files) {

    this.raiseTicketService.Postraisticket(files, this.raiseTicketGroup.value);
    this.raiseTicketGroup.reset();
    this.toastrService.success('Submitted successfully', 'Success');

  }



  raiseTicketGroup = this.fb.group({
      IncidentCode: [null],
      Category: ['', Validators.required],
      Priority: ['', Validators.required],
      ProblemDescription: ['', Validators.required],
      RaisedDateTime: this.datePipe.transform(Date.now(), 'dd-MMM-yyyy'),
    RaisedBy: ['',Validators.required],
      ResolveDescription: [''],
      ResolvedDateTime: [''],
      ResolvedBy: [''],
      ResponseDescription: [''],
      ResponseDateTime: [''],
      ResponseBy: [''],
      Status: ['', Validators.required],
      RaisedByName: [''],
      ModuleName: ['', Validators.required],
      Link: [''],
      ConfirmBy: [''],
      ConfirmDateTime: [''],
      IncidentId: null,
      FileName: [''],
      FilePath: ['']
    });


}
