import { TestBed } from '@angular/core/testing';

import { InvoiceEventsService } from './invoice-events.service';

describe('InvoiceEventsService', () => {
  let service: InvoiceEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
