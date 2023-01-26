import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsEmptyComponent } from './invoice-details-empty.component';

describe('InvoiceDetailsEmptyComponent', () => {
  let component: InvoiceDetailsEmptyComponent;
  let fixture: ComponentFixture<InvoiceDetailsEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailsEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailsEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
