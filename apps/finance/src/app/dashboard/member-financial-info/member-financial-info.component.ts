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
  displayedColumns: string[] = ['sno', 'monthly-emi', 'due-date', 'paid', 'paid-amount', 'due-amount', 'fine', 'paid-date', 'action'];
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
      this.totalEmiHistory = res;
      console.log('totalEmiHistory',res)
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updatePaid(status:any, row:any) {
    if(status){
      this.service.updateMemberFinPaid(this.finInfo['file-number'], row['sno'],status, 0, Number(row['monthly-emi']), Date(), 0);
    } else {
      this.service.updateMemberFinPaid(this.finInfo['file-number'], row['sno'],status, 0, 0, null, 0);
    }
    this.service.updateMemberStatus(this.finInfo['file-number'], 'ongoing');
    setTimeout(()=> {
      this.totalPaid();
      this.totalExtra();
      var paidCount = this.totalEmiHistory.filter((x: { paid: boolean; })=>x.paid == true).length;
      var totalCount = this.totalEmiHistory.length;
      if(paidCount == totalCount)
        this.preCloseStatus();
    }, 3000);
  }

  preCloseStatus() {
    this.service.updateMemberStatus(this.finInfo['file-number'], 'completed');
  }

  updatePaidInputs(row:any, paid:any, fineInput:any, date:any) {
    var due = Number(paid)-Number(fineInput)-row['monthly-emi'];   
    this.service.updateMemberFinPaid(this.finInfo['file-number'], row['sno'], row['paid'], Math.abs(due), Number(paid), date || Date(), Number(fineInput));
    setTimeout(()=> {
      this.totalPaid()
      this.totalExtra()
    }, 3000);
  }

  totalPaid() {
    var paid = this.totalEmiHistory.filter((x: { paid: boolean; }) => x.paid==true);
    var totalPaid= paid.map((total: { [x: string]: any; })=>total['paid-amount']).reduce((pre: any, next: any) => pre + next, 0);
    this.service.updateMember(this.finInfo['file-number'], Math.ceil(totalPaid));
  }

  preClose(inputs:any, valid:any) {
    if(valid == "VALID") {
      var paid = this.totalEmiHistory.filter((x: { paid: boolean; }) => x.paid==true);
      var totalPaid= paid.map((total: { [x: string]: any; })=>total['paid-amount']).reduce((pre: any, next: any) => pre + next, 0);
      var totalPreClosed = totalPaid+inputs['preclose-amount'];
      this.service.updateMemberPreclose(this.finInfo['file-number'], totalPreClosed, inputs['preclose-amount'], inputs['preclose-date']);
      this.service.updateMemberStatus(this.finInfo['file-number'], 'pre-closed');
      this.closePopup();
    }
  }

  totalExtra() {
    var paid = this.totalEmiHistory.filter((x: { paid: boolean; }) => x.paid==true);
    var totalPaid= paid.map((total: { [x: string]: any; })=>total['fine']).reduce((pre: any, next: any) => pre + next, 0);
    this.service.updateMemberExtra(this.finInfo['file-number'], Math.ceil(totalPaid));
    console.log('totalExtra', totalPaid);
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
