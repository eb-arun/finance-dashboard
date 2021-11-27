import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMemberProfileComponent } from './popup-member-profile.component';

describe('PopupMemberProfileComponent', () => {
  let component: PopupMemberProfileComponent;
  let fixture: ComponentFixture<PopupMemberProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupMemberProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
