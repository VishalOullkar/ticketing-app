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

@Component({
  selector: 'app-edit-raised-ticket',
  templateUrl: './edit-raised-ticket.component.html',
  styleUrls: ['./edit-raised-ticket.component.css']
})
export class EditRaisedTicketComponent implements OnInit {

  constructor(private raiseTicketService: RaiseTicketService, private fb: FormBuilder,
    private datePipe: DatePipe,private route:ActivatedRoute) { }

  IncidentId: any;
  var 
  IncidentModel: Incident;


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
      FilePath: ''

      }
  }


  ngOnInit() {
    this.reset();
    let id1 = this.route.snapshot.paramMap.get('id');
    let id2;
    this.route.paramMap.subscribe((params: ParamMap) => {
       id2 = params.get('id');
   //  console.warn(id2);
    });

     this.raiseTicketService.getIncidentDetailsById(id2)
       // .subscribe(data => this.IncidentModel === data);
    //   .subscribe(x => console.log(x));
       .subscribe(res => {
         this.IncidentModel = res;
     //    console.log(this.IncidentModel);
       })
    //console.warn(this.IncidentModel);

   // this.IncidentModel = this.raiseTicketService.SelectedIncident
    //console.warn(this.IncidentModel);


    //this.IncidentId = this.raiseTicketService.incidentId;
    //this.IncidentModel = this.raiseTicketService.SelectedIncident;
    //this.getSelectedIncident(this.IncidentId);
   // console.warn(this.IncidentModel);

    //this.raiseTicketGroup.patchValue(this.IncidentModel);
  }

  //getSelectedIncident(IncidentId:any)
  //{
  //  this.raiseTicketService.getIncidentDetailsById(IncidentId).subscribe(data => this.raiseTicketService.SelectedIncident = data);
  //  //this.IncidentModel = this.raiseTicketService.SelectedIncident;
  //  //console.log(this.IncidentModel);
  //  //this.raiseTicketGroup.patchValue(this.IncidentModel);
  //}

  //raiseTicketGroup = this.fb.group(
  //  {
  //    IncidentCode: '',
  //    Category: ['', Validators.required],
  //    Priority: ['', Validators.required],
  //    ProblemDescription: ['', Validators.required],
  //    RaisedDateTime: this.datePipe.transform(Date.now(), 'dd-MMM-yyyy'),
  //    RaisedBy: [''],
  //    ResolveDescription: [''],
  //    ResolvedDateTime: null,
  //    ResolvedBy: [''],
  //    ResponseDescription: [''],
  //    ResponseDateTime: null,
  //    ResponseBy: [''],
  //    Status: ['', Validators.required],
  //    RaisedByName: [''],
  //    ModuleName: ['', Validators.required],
  //    Link: [''],
  //    ConfirmBy: [''],
  //    ConfirmDateTime: null,
  //    IncidentId: null,
  //    FileName: [''],
  //    FilePath: ['']
  //  });

}
