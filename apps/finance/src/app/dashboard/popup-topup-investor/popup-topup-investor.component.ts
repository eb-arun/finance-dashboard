import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../../services/data-service.service';
import { PopupDeleteMemberComponent } from '../popup-delete-member/popup-delete-member.component';

@Component({
  selector: 'finance-dashboard-popup-topup-investor',
  templateUrl: './popup-topup-investor.component.html',
  styleUrls: ['./popup-topup-investor.component.scss']
})
export class PopupTopupInvestorComponent implements OnInit {
  topupFormGroup: any;
  errorInvalid:string = "Field is required";
  displayedColumns: string[] = ['sno', 'amount', 'date'];
  dataSource = new MatTableDataSource();  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  docId:any;
  constructor(private formBuilder:FormBuilder, public dialogRef: MatDialogRef<PopupDeleteMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public service:DataServiceService) { }

  ngOnInit(): void {
    this.topupFormGroup = this.formBuilder.group({
      'date-selection': [null, [Validators.required]],
      'amount': [null, [Validators.required]]
    })
    this.getStatement();
  }

  increaseInvest(inputs:any, valid:any){
    if(valid=='VALID') {
      inputs['mobile'] = this.data.mobile;
      this.service.addInvestorFin(inputs, this.docId);
    }
  }

  getStatement(){
    this.service.getInvestorsFin(this.data['mobile']).subscribe(res=> {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.docId = res.length+1;
      this.totalCalc(res);
    })
  }
  
  totalCalc(state:any) {
    var totalAmount = state.map((item: { amount: any; }) => item.amount).reduce((prev: any, next: any) => prev + next, 0);
    this.service.updateInsvestorTotal(totalAmount, this.data['mobile']);
  }

  closePop(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
