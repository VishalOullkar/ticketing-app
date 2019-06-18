import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TokenInterceptorService } from './token-interceptor.service';



import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule, routingComponets } from './app-routing.module';
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
import { GlobalErrorHandler } from './Shared/global-error-handler.service';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
   
    AppComponent, RaisedTicketListPipe,
    routingComponets,RaisedTicketListPipe,
    SearchIncidentsPipe,
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

  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    DatePipe, AuthGuard],


  bootstrap: [AppComponent]
})
export class AppModule { }
