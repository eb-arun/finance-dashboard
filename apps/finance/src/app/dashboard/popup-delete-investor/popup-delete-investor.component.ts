import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from '../../services/data-service.service';
import { PopupDeleteMemberComponent } from '../popup-delete-member/popup-delete-member.component';

@Component({
  selector: 'finance-dashboard-popup-delete-investor',
  templateUrl: './popup-delete-investor.component.html',
  styleUrls: ['./popup-delete-investor.component.scss']
})
export class PopupDeleteInvestorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupDeleteMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public service:DataServiceService) { }

  ngOnInit(): void {
  }

  deleteInvestor() {
    this.service.deleteInvestor(this.data);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
