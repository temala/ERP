import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsEmptyComponent } from './client-details-empty.component';

describe('ClientDetailsEmptyComponent', () => {
  let component: ClientDetailsEmptyComponent;
  let fixture: ComponentFixture<ClientDetailsEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailsEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDetailsEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
