import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RaisedTicketListComponent } from './raised-ticket-list/raised-ticket-list.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { LoginComponent } from './login/login.component';
import { EditRaisedTicketComponent } from './raised-ticket-list/edit-raised-ticket/edit-raised-ticket.component';

import { IncidentSupportComponent } from './incident-support/incident-support.component';
import { UserComponent } from './master-user/user/user.component';
import { AuthGuard } from './auth.guard';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IncidentSupportModelComponent } from './incident-support-model/incident-support-model.component';

const routes: Routes = [
  { path: 'sidebar', component: SidebarComponent },
  { path: 'supportModel', component: IncidentSupportModelComponent }, 
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }, 
  { path: 'raiseTicket', component: RaiseTicketComponent }, 
  { path: 'incidentSupport', component: IncidentSupportComponent, canActivate: [AuthGuard]},
  { path: 'raisedTicketList', component: RaisedTicketListComponent },
  { path: 'editRaisedTicket', component: EditRaisedTicketComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' }

  ]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule]
})

export class AppRoutingModule { }

export const routingComponets = [SidebarComponent,IncidentSupportComponent, EditRaisedTicketComponent, RaisedTicketListComponent, RaiseTicketComponent]
