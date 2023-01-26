import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraDeleteMessageComponent } from './cra-delete-message.component';

describe('CraDeleteMessageComponent', () => {
  let component: CraDeleteMessageComponent;
  let fixture: ComponentFixture<CraDeleteMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraDeleteMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraDeleteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
