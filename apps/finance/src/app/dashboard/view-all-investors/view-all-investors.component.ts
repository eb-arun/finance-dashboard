import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../../services/data-service.service';
import { PopupAddInvestorComponent } from '../popup-add-investor/popup-add-investor.component';
import { PopupDeleteInvestorComponent } from '../popup-delete-investor/popup-delete-investor.component';
import { PopupTopupInvestorComponent } from '../popup-topup-investor/popup-topup-investor.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'finance-dashboard-view-all-investors',
  templateUrl: './view-all-investors.component.html',
  styleUrls: ['./view-all-investors.component.scss']
})
export class ViewAllInvestorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'mobile', 'amount', 'date-selection', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(public dialog: MatDialog, private service:DataServiceService) { }

  ngOnInit(): void {
    this.getAllInvestors();
  }

  addInvestorPopup() {
    const dialogRef = this.dialog.open(PopupAddInvestorComponent, {
      width:'450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllInvestors() {
    this.service.getInvestors().subscribe(res=> {
      console.log('investors', res);
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteInvestor(mobile:any) {
    const dialogRef = this.dialog.open(PopupDeleteInvestorComponent, {
      height: 'auto',
      width:'550px',
      data: mobile
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  topUp(user:any) {
    const dialogRef = this.dialog.open(PopupTopupInvestorComponent, {
      height: '80vh',
      width:'750px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
