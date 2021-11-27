import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllInvestorsComponent } from './view-all-investors.component';

describe('ViewAllInvestorsComponent', () => {
  let component: ViewAllInvestorsComponent;
  let fixture: ComponentFixture<ViewAllInvestorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllInvestorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
