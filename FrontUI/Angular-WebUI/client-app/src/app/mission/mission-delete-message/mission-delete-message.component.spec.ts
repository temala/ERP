import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDeleteMessageComponent } from './mission-delete-message.component';

describe('MissionDeleteMessageComponent', () => {
  let component: MissionDeleteMessageComponent;
  let fixture: ComponentFixture<MissionDeleteMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionDeleteMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionDeleteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
