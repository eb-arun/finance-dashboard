import { Statement } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  displayedColumns: string[] = ['sno', 'monthly-emi', 'due-date', 'paid'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  unsub:Subscription | undefined;
  constructor(private service:DataServiceService) { }

  ngOnInit(): void {
    this.getFinData(this.finInfo['file-number'], this.finInfo['duration']);
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
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updatePaid(status:any, row:any) {
    console.log('paid', status );
    this.service.updateMemberFinPaid(this.finInfo['file-number'], row['sno'],status);

  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.unsub?.unsubscribe();
}
}
