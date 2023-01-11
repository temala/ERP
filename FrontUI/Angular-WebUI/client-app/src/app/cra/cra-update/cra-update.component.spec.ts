import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraUpdateComponent } from './cra-update.component';

describe('CraUpdateComponent', () => {
  let component: CraUpdateComponent;
  let fixture: ComponentFixture<CraUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
