import { TestBed } from '@angular/core/testing';

import { CraEventsService } from './cra-events.service';

describe('CraEventService', () => {
  let service: CraEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
