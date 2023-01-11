import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraDetailsEmptyComponent } from './cra-details-empty.component';

describe('CraDetailsEmptyComponent', () => {
  let component: CraDetailsEmptyComponent;
  let fixture: ComponentFixture<CraDetailsEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraDetailsEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraDetailsEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
