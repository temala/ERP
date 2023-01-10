import { TestBed } from '@angular/core/testing';

import { MissionEventsService } from './mission-events.service';

describe('MissionEventsService', () => {
  let service: MissionEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
