import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedTicketListComponent } from './raised-ticket-list.component';

describe('RaisedTicketListComponent', () => {
  let component: RaisedTicketListComponent;
  let fixture: ComponentFixture<RaisedTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisedTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
