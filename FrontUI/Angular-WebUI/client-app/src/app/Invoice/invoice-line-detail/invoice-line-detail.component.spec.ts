import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLineDetailComponent } from './invoice-line-detail.component';

describe('InvoiceLineDetailComponent', () => {
  let component: InvoiceLineDetailComponent;
  let fixture: ComponentFixture<InvoiceLineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceLineDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceLineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
