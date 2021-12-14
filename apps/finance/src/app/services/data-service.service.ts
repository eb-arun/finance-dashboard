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

  addMember(fileId:any, inputs:any, type:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).set(inputs).then(res=> {
        console.log('add success', res);
        if(type.request == 'add' || (inputs['duration'] != type.member['duration']))
        this.durationStatement(inputs);
      },
      err=> {
        reject(err)
      })

    })
  }

  deleteMemberFinance(fileId:any, financeIndex:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).collection('finance').doc(`${financeIndex}`).delete().then(res=> {
        console.log('delete mem finance success', res);
      },
      err=> {
        reject(err)
      })

    })
  }

  deleteMember(fileId:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).delete().then(res=> {
        console.log('delete member success', res);
      },
      err=> {
        reject(err)
      })

    })
  }

  updateMemberFinPaid(fileId:any, serialNo:any, status:boolean, emi:any, total:any, fine:any=0) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).collection('finance').doc(`${serialNo}`).update({
        'paid':status,
        'paid-total':emi,
        'fine':fine,
        'paid-amount':total
    
    }).then(res=> {
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
    var date = all['date-selection'];
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

  addInvestor(inputs:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('investors').doc(`${inputs.mobile}`).set(inputs).then(res=> {
        console.log('add success', res);
        this.addInvestorFin(inputs);
      },
      err=> {
        reject(err)
      })

    })
  }

  updateInsvestorTotal(total:any, mobile:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('investors').doc(`${mobile}`).set({'amount': total}, {merge:true}).then(res=> {
        console.log('update total success', res);
      },
      err=> {
        reject(err)
      })

    })
  }

  addInvestorFin(inputs:any){
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('investors').doc(`${inputs.mobile}`).collection('finance').doc().set(
        {
          'date': inputs['date-selection'],
          'amount': inputs.amount,
          'created': Date.now(),
          'created-by': this.userName.value
        }
        , {merge:true}).then(res=> {
          // this.totalCalculation(inputs);
      },
      err=> {
        reject(err)
      })

    })
  }

  totalCalculation(inputs:any) {
    return this.afs.collection('investors').doc(`${inputs.mobile}`).collection('finance');
  }

  getInvestors() {
    return this.afs.collection('investors').valueChanges();
  }

  getInvestorsFin(mobile:any) {
    return this.afs.collection('investors').doc(`${mobile}`).collection('finance').valueChanges();
  }

  deleteInvestor(mobile:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('investors').doc(`${mobile}`).delete().then(res=> {
        console.log('delete success', res);
      },
      err=> {
        reject(err)
      })

    })
  }

}
