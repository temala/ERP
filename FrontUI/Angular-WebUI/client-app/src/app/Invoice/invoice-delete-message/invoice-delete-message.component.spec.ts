import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDeleteMessageComponent } from './invoice-delete-message.component';

describe('InvoiceDeleteMessageComponent', () => {
  let component: InvoiceDeleteMessageComponent;
  let fixture: ComponentFixture<InvoiceDeleteMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDeleteMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDeleteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
