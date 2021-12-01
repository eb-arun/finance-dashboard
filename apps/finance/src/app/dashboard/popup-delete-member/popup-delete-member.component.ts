import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'finance-dashboard-popup-delete-member',
  templateUrl: './popup-delete-member.component.html',
  styleUrls: ['./popup-delete-member.component.scss']
})
export class PopupDeleteMemberComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<PopupDeleteMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public service:DataServiceService) {}

  ngOnInit(): void {
  }

  deleteMember() {
    this.service.deleteMember(this.data);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
