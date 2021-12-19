import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedBankAuthPageComponent } from './confirmed-bank-auth-page.component';

describe('ConfirmedBankAuthPageComponent', () => {
  let component: ConfirmedBankAuthPageComponent;
  let fixture: ComponentFixture<ConfirmedBankAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedBankAuthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedBankAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
