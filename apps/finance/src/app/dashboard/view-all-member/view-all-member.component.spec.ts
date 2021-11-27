import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMemberComponent } from './view-all-member.component';

describe('ViewAllMemberComponent', () => {
  let component: ViewAllMemberComponent;
  let fixture: ComponentFixture<ViewAllMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
