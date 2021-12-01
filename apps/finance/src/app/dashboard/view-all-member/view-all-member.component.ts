import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../../services/data-service.service';
import { PopupAddMemberComponent } from '../popup-add-member/popup-add-member.component';
import { PopupDeleteMemberComponent } from '../popup-delete-member/popup-delete-member.component';
import { PopupMemberProfileComponent } from '../popup-member-profile/popup-member-profile.component';

@Component({
  selector: 'finance-dashboard-view-all-member',
  templateUrl: './view-all-member.component.html',
  styleUrls: ['./view-all-member.component.css']
})
export class ViewAllMemberComponent implements OnInit {
  displayedColumns: string[] = ['file-number', 'name', 'fname', 'mobile', 'total-amount', 'month-duration', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  
  constructor(public dialog: MatDialog, private service:DataServiceService, private afs:AngularFirestore) { }

  ngOnInit(): void {
    this.listAllMember();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addMemberPopup() {
    const dialogRef = this.dialog.open(PopupAddMemberComponent, {
      height: '90%' ,
      width:'750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openProfile(member: any) {
    const dialogRef = this.dialog.open(PopupMemberProfileComponent, {
      height: '630px' ,
      width:'450px',
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  listAllMember() {
    this.afs.collection('members').valueChanges().subscribe(res=>{
      this.dataSource.data = res;
      console.log('all mem',this.dataSource.data);
    })
  }

  updateMember(member:any, event:Event) {
    console.log('update', member);
    const dialogRef = this.dialog.open(PopupAddMemberComponent, {
      height: '90%' ,
      width:'750px',
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    event.stopPropagation();
  }

  deleteMember(fileId:any, event:Event) {
    const dialogRef = this.dialog.open(PopupDeleteMemberComponent, {
      height: 'auto' ,
      width:'550px',
      data: fileId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });



    event.stopPropagation();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
}
