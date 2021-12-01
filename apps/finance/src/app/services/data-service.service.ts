import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  userName = new BehaviorSubject('');
  interest:number = 2;
  constructor(public afs: AngularFirestore) { }

  addMember(fileId:any, inputs:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).set(inputs).then(res=> {
        console.log('add success', res);
      },
      err=> {
        reject(err)
      })

    })
  }

  deleteMember(fileId:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).delete().then(res=> {
        console.log('add success', res);
      },
      err=> {
        reject(err)
      })

    })
  }
}
