import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, FirestoreInstances, FirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DataServiceService } from './services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'finance-dashboard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  // private itemsCollection: AngularFirestoreCollection<any>;
  title = 'finance';
  // items: Observable<any[]>;

  showLogout:boolean = false;

  constructor(private afs: AngularFirestore, private service:DataServiceService, private route:Router) {
    // this.itemsCollection = afs.collection<any>('test');
    // this.items = this.itemsCollection.valueChanges();
    // console.log('fire', this.items);
    // this.items.subscribe(res=> {
    //   console.log(res);
    // })
    this.service.userName.subscribe(res=>{
      if(res == '') {
        this.showLogBtn(false);
        this.route.navigate(['/login']);
      } else {
        this.showLogBtn(true);
      }
    })
   
  }

  ngOnInit(): void {
  }

  logout() {
    this.service.userName.next('');
      this.showLogout = false;
      this.route.navigate(['/login']);
    // this.afs.doc(`login/${this.service.userName.value}`).update({'active':false}).then(()=> {
    // });
  }

  showLogBtn(value:boolean) {
    this.showLogout = value;
  }

}
