import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteMemberComponent } from './popup-delete-member.component';

describe('PopupDeleteMemberComponent', () => {
  let component: PopupDeleteMemberComponent;
  let fixture: ComponentFixture<PopupDeleteMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeleteMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
