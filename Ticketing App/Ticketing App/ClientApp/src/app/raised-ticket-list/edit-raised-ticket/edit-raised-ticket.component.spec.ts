import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRaisedTicketComponent } from './edit-raised-ticket.component';

describe('EditRaisedTicketComponent', () => {
  let component: EditRaisedTicketComponent;
  let fixture: ComponentFixture<EditRaisedTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRaisedTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRaisedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
