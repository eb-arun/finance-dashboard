import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'finance-dashboard-popup-member-profile',
  templateUrl: './popup-member-profile.component.html',
  styleUrls: ['./popup-member-profile.component.scss']
})
export class PopupMemberProfileComponent implements OnInit {
  constructor(private dialogRef:MatDialogRef<PopupMemberProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
   }

  ngOnInit(): void {
  }
  
  closePop() {
    this.dialogRef.close();
  }
}
