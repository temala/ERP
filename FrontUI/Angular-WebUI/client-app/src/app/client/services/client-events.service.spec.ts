import { TestBed } from '@angular/core/testing';

import { ClientEventsService } from './client-events.service';

describe('ClientEventsService', () => {
  let service: ClientEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
