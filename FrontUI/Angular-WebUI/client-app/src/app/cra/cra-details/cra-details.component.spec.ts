import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraDetailsComponent } from './cra-details.component';

describe('CraDetailsComponent', () => {
  let component: CraDetailsComponent;
  let fixture: ComponentFixture<CraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
