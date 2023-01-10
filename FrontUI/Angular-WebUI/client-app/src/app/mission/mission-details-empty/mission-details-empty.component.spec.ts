import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDetailsEmptyComponent } from './mission-details-empty.component';

describe('MissionDetailsEmptyComponent', () => {
  let component: MissionDetailsEmptyComponent;
  let fixture: ComponentFixture<MissionDetailsEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionDetailsEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionDetailsEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
