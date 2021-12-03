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
        this.durationStatement(inputs);
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

  updateMemberFinPaid(fileId:any, serialNo:any, status:boolean) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).collection('finance').doc(`${serialNo}`).update({'paid':status}).then(res=> {
        console.log('add success', res);
      },
      err=> {
        reject(err)
      })

    })
  }

  addFinanceData(fileId:any, sno:any, inputs:any){
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).collection('finance').doc(`${sno}`).set(inputs, {merge:true}).then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

  durationStatement(all:any) {
    var date = new Date();
    var todayDate = date.getDate();
    var duration = all.duration;
    var statement = [];
    var monthlyEMI = all.emiPerMonth;
    for(let i=1;i<=duration;i++){
      let dueDate = new Date(date.getFullYear(), date.getMonth()+i, todayDate);
      let state = {
        'due-date':dueDate,
        'sno' : i,
        'monthly-emi': monthlyEMI,
        'paid':false 
      }
      this.addFinanceData(all['file-number'], i, state);
      statement.push(state);
    }
    console.log('emi state', statement);
    all['fin-statement'] = statement; 
  }

  getFinanceData(fileId:any, duration:any) {
      return this.afs.collection('members').doc(fileId).collection('finance', ref=>ref.where('sno', '<=', duration)).valueChanges();
  }

}
