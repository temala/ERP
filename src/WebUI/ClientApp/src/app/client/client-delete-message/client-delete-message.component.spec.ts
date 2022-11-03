import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeleteMessageComponent } from './client-delete-message.component';

describe('ClientDeleteMessageComponent', () => {
  let component: ClientDeleteMessageComponent;
  let fixture: ComponentFixture<ClientDeleteMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDeleteMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDeleteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
