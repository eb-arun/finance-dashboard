import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  displayedColumns: string[] = ['file-number', 'name', 'fname', 'mobile', 'total-amount', 'totalPaid', 'duration', 'action', 'status', 'modified'];
  dataSource = new MatTableDataSource();
  dueFileID: any;
  allFiles:any = [];
  allUnsub:Subscription | undefined;
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

  addMemberPopup(member:any, request:any, event:Event) {
    const dialogRef = this.dialog.open(PopupAddMemberComponent, {
      height: '90%' ,
      width:'750px',
      data: {member:member, request:request, exists:this.allFiles}
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    event.stopPropagation();
  }

  openProfile(member: any) {
    const dialogRef = this.dialog.open(PopupMemberProfileComponent, {
      height: '90vh' ,
      width:'100vw',
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  listAllMember() {
    this.allUnsub?.unsubscribe();
    this.allUnsub = this.afs.collection('members').valueChanges().subscribe(res=>{
      this.dataSource.data = res;
      this.listAllMemberFin();
      this.allFileNumber(res);
    })
  }

  allFileNumber(all:any) {
    all.filter((x: { [x: string]: any; })=> {
      this.allFiles.push(x['file-number']);
    })
  }

  listAllMemberFin() {
    var allFinance:any = [];
    var data:any = this.dataSource.data;
    var dueFiles:any = [];
    for(let i=0;i<this.dataSource.data.length;i++) {
      this.afs.collection('members').doc(data[i]['file-number']).collection('finance').valueChanges().subscribe(res=>{
        allFinance.push(res);
        var today = new Date();
        res.filter(x=> {
          if((x['due-date'].toDate().getTime()<today.getTime()) == true && x.paid == false ) {
            dueFiles.push(data[i]['file-number']);
          }
          })
          this.dueFileID = [...new Set(dueFiles)];
      })
    }
  }

  // updateMember(member:any, event:Event) {
  //   console.log('update', member);
  //   const dialogRef = this.dialog.open(PopupAddMemberComponent, {
  //     height: '90%' ,
  //     width:'750px',
  //     data: member
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });

    
  // }

  deleteMember(member:any, event:Event) {
    const dialogRef = this.dialog.open(PopupDeleteMemberComponent, {
      height: 'auto' ,
      width:'550px',
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {
    });



    event.stopPropagation();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.allUnsub?.unsubscribe();
}
  
}
