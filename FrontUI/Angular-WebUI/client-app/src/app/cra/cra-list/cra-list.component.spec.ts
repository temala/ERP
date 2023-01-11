import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraListComponent } from './cra-list.component';

describe('CraListComponent', () => {
  let component: CraListComponent;
  let fixture: ComponentFixture<CraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
