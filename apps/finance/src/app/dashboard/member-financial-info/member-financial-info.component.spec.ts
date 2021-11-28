import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFinancialInfoComponent } from './member-financial-info.component';

describe('MemberFinancialInfoComponent', () => {
  let component: MemberFinancialInfoComponent;
  let fixture: ComponentFixture<MemberFinancialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberFinancialInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberFinancialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
