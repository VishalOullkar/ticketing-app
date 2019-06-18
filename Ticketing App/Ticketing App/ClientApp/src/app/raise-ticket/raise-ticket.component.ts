import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'guid-typescript';
import { RaiseTicketService } from '../Shared/raise-ticket.service';

import { HttpRequest, HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css']
})
export class RaiseTicketComponent implements OnInit {

  submitted = false;
  dropdownsubmitted = false;
  NewIncidentId: Guid;
  emailid: any;
  name: any;
  templink: any;
  constructor(private raiseTicketService: RaiseTicketService, private route: ActivatedRoute,
    private fb: FormBuilder,private router:Router, private datePipe: DatePipe, private toastrService: ToastrService, private http: HttpClient) { }
  IncidentCode: string;
  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.emailid = params.get('id');
      this.name = params.get('name');

      this.raiseTicketService.emailid = this.emailid;
      this.raiseTicketService.name = this.name;
      this.templink = 'http://localhost:59090/raiseTicket/' + this.emailid + '/' + name

        
    });
    
    this.raiseTicketService.getNextIncidentId().subscribe(data => this.raiseTicketService.IncidentList = data);
    }



  get fc() { return this.raiseTicketGroup.controls }

  onSave(files) {


    this.submitted = true;
    this.dropdownsubmitted = true;

    if (this.raiseTicketGroup.get('Priority').value =='--Select--') {
      this.dropdownsubmitted = true;

    } else {
      this.dropdownsubmitted = false;

    }
    if (this.raiseTicketGroup.invalid) {
      this.submitted = true;
      return;
    
    }
    else {
      this.submitted = false;
  
      this.raiseTicketGroup.value.Status = 'outstanding'
      this.raiseTicketGroup.value.IncidentId = this.IncidentCode;
      this.raiseTicketGroup.value.RaisedByName = this.raiseTicketService.name;
      this.raiseTicketGroup.value.Emailid = this.raiseTicketService.emailid;
      this.raiseTicketService.Postraisticket(files, this.raiseTicketGroup.value);
      this.raiseTicketGroup.reset();
      this.toastrService.success('Submitted successfully', 'Success');
      this.router.navigate(['/raisedTicketList'])
    }


  }

  callType(t:any) {
    if (t != '--Select--') {
      this.dropdownsubmitted = false;
    }
  }

  raiseTicketGroup = this.fb.group({
      IncidentCode: [null],
      Category: ['', Validators.required],
      Priority: ['--Select--', Validators.required],
      ProblemDescription: ['', Validators.required],
      RaisedDateTime: this.datePipe.transform(Date.now(), 'dd-MMM-yyyy'),
      RaisedBy: [''],
      ResolveDescription: [''],
      ResolvedDateTime: [''],
      ResolvedBy: [''],
      ResponseDescription: [''],
      ResponseDateTime: [''],
      ResponseBy: [''],
      Status: [''],
      RaisedByName: [''],
      ModuleName: ['', Validators.required],
      Link: [''],
      ConfirmBy: [''],
      ConfirmDateTime: [''],
      IncidentId: null,
      FileName: [''],
    FilePath: [''],
    Emailid:[''],
    MobileNo:['']

    });


}
