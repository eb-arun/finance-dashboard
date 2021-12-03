import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteInvestorComponent } from './popup-delete-investor.component';

describe('PopupDeleteInvestorComponent', () => {
  let component: PopupDeleteInvestorComponent;
  let fixture: ComponentFixture<PopupDeleteInvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeleteInvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
