import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTopupInvestorComponent } from './popup-topup-investor.component';

describe('PopupTopupInvestorComponent', () => {
  let component: PopupTopupInvestorComponent;
  let fixture: ComponentFixture<PopupTopupInvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTopupInvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTopupInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
