import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLineComponent } from './invoice-line.component';

describe('ProductComponent', () => {
  let component: InvoiceLineComponent;
  let fixture: ComponentFixture<InvoiceLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
