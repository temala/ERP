import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraAddComponent } from './cra-add.component';

describe('CraAddComponent', () => {
  let component: CraAddComponent;
  let fixture: ComponentFixture<CraAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
