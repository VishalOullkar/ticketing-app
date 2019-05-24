import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BsDropdownModule } from 'ngx-bootstrap';



import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule, routingComponets } from './app-routing.module';
import { RaiseTicketService } from './Shared/raise-ticket.service';
import { LoginComponent } from './login/login.component';
import { EditRaisedTicketComponent } from './raised-ticket-list/edit-raised-ticket/edit-raised-ticket.component';
import { IncidentSupportComponent } from './incident-support/incident-support.component';
import { IncidentSupportModelComponent } from './incident-support-model/incident-support-model.component';
import { RaisedTicketListPipe } from './Shared/raised-ticket-list.pipe';
import { SearchIncidentsPipe } from './Shared/search-incidents.pipe';
import { UserComponent } from './master-user/user/user.component';
import { AuthGuard } from './auth.guard';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
   
    AppComponent, RaisedTicketListPipe, SearchIncidentsPipe,
    NavMenuComponent, routingComponets,
    LoginComponent, EditRaisedTicketComponent,
    IncidentSupportComponent, IncidentSupportModelComponent,
    RaisedTicketListPipe,
    SearchIncidentsPipe,
    UserComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSmartModalModule.forRoot(), PerfectScrollbarModule, NgbModule,
    BsDropdownModule.forRoot(),
    AngularFontAwesomeModule,
    HttpClientModule, AppRoutingModule, RouterModule,  NgxPaginationModule,
    FormsModule, HttpModule, ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }),
  ],
 // providers: [DatePipe, AuthGuard],

  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }, DatePipe, AuthGuard],


  bootstrap: [AppComponent]
})
export class AppModule { }
