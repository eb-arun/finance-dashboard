import { Statement } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'finance-dashboard-member-financial-info',
  templateUrl: './member-financial-info.component.html',
  styleUrls: ['./member-financial-info.component.scss']
})
export class MemberFinancialInfoComponent implements OnInit {
  @Input() finInfo:any;
  displayedColumns: string[] = ['sno', 'monthly-emi', 'due-date', 'paid', 'paid-total', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  unsub:Subscription | undefined;
  totalEmiHistory:any;
  preCloseFormGroup: any;
  errorInvalid:string = "Field is required";
  panelOpenState = false;
  constructor(private service:DataServiceService, private formBuilder:FormBuilder, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    console.log('full data', this.finInfo)
    if(this.finInfo['status']=='pre-closed'){
      this.displayedColumns = ['sno', 'monthly-emi', 'due-date', 'paid-total'];
    }
    this.getFinData(this.finInfo['file-number'], this.finInfo['duration']);
    this.preCloseFormGroup = this.formBuilder.group({
      'preclose-date': [null, [Validators.required]],
      'preclose-amount': [null, [Validators.required]]
    })
//     var x = this.afs.collection('members').doc('2');
//     x.set({'fin-statement': [{
//       'due-date': '',
// 'monthly-emi': 3060,
// 'paid': true,
// 'sno': 1
//     }]}, {merge:true});
  }

  getFinData(fileId:any, duration:any) {
    this.unsub?.unsubscribe();
    this.unsub = this.service.getFinanceData(fileId, duration).subscribe(res=> {
      console.log('fin data', res);
      this.totalEmiHistory = res;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updatePaid(status:any, row:any) {
    if(status){
      this.service.updateMemberFinPaid(this.finInfo['file-number'], row['sno'],status, row['monthly-emi'], row['monthly-emi']);
    } else {
      this.service.updateMemberFinPaid(this.finInfo['file-number'], row['sno'],status, 0, 0);
    }
    this.service.updateMemberStatus(this.finInfo['file-number'], 'ongoing');
    setTimeout(()=> {
      this.totalPaid()
    }, 3000);
  }

  updatePaidInputs(row:any, paid:any, fine:any=0) {
    console.log('paid', row, paid, fine);
    this.service.updateMemberFinPaid(this.finInfo['file-number'], row['sno'], row['paid'], Number(paid)+Number(fine), Number(paid), fine);
    setTimeout(()=> {
      this.totalPaid()
    }, 3000);
  }

  totalPaid() {
    var paid = this.totalEmiHistory.filter((x: { paid: boolean; }) => x.paid==true);
    var totalPaid= paid.map((total: { [x: string]: any; })=>total['paid-total']).reduce((pre: any, next: any) => pre + next, 0);
    console.log('totalPaid', totalPaid);
    this.service.updateMember(this.finInfo['file-number'], totalPaid);
  }

  preClose(inputs:any, valid:any) {
    if(valid == "VALID") {
      var paid = this.totalEmiHistory.filter((x: { paid: boolean; }) => x.paid==true);
      var totalPaid= paid.map((total: { [x: string]: any; })=>total['paid-total']).reduce((pre: any, next: any) => pre + next, 0);
      console.log('totalPaid', totalPaid, totalPaid+inputs['preclose-amount']);
      var totalPreClosed = totalPaid+inputs['preclose-amount'];
      this.service.updateMemberPreclose(this.finInfo['file-number'], totalPreClosed, inputs['preclose-amount'], inputs['preclose-date']);
      this.service.updateMemberStatus(this.finInfo['file-number'], 'pre-closed');
      this.closePopup();
    }
  }

  closePopup() {
    this.dialogRef.closeAll();
  }

 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.unsub?.unsubscribe();
}
}
