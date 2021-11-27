import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddInvestorComponent } from './popup-add-investor.component';

describe('PopupAddInvestorComponent', () => {
  let component: PopupAddInvestorComponent;
  let fixture: ComponentFixture<PopupAddInvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddInvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
