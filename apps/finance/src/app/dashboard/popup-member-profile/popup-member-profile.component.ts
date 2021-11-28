import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'finance-dashboard-popup-member-profile',
  templateUrl: './popup-member-profile.component.html',
  styleUrls: ['./popup-member-profile.component.scss']
})
export class PopupMemberProfileComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<PopupMemberProfileComponent>) { }

  ngOnInit(): void {
  }
  
  closePop() {
    this.dialogRef.close();
  }
}
