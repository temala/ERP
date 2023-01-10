import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionUpdateComponent } from './mission-update.component';

describe('MissionUpdateComponent', () => {
  let component: MissionUpdateComponent;
  let fixture: ComponentFixture<MissionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
