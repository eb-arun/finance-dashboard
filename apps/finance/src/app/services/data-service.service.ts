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
        if(type.request == 'add' || (inputs['duration'] != type.member['duration']) || (inputs['date-selection'] != type.member['date-selection']))
        this.durationStatement(inputs);
      },
      err=> {
        reject(err)
      })

    })
  }

  updateMember(fileId:any, total:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).update({
        'totalPaid':total
    }).then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

  updateMemberExtra(fileId:any, extra:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).update({
        'totalExtraPaid':extra
    }).then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

  updateMemberPreclose(fileId:any, total:any, preClose:any, preCloseDate:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).update({
        'totalPaid':total, 
        'preClosePaid': preClose,
        'preClosedDate': preCloseDate
    }).then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

  updateMemberStatus(fileId:any, status:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).update({
        'status':status
    }).then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

  deleteMemberFinance(fileId:any, financeIndex:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).collection('finance').doc(`${financeIndex}`).delete().then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

  deleteMember(fileId:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).delete().then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

  updateMemberFinPaid(fileId:any, serialNo:any, status:boolean, due:any, total:any, paidDate:any, fine:any=0) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('members').doc(fileId).collection('finance').doc(`${serialNo}`).update({
        'paid':status,
        'fine':fine,
        'due-amount':due,
        'paid-amount':total, 
        'paid-date':paidDate
    
    }).then(res=> {
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
        'monthly-emi': Math.ceil(monthlyEMI),
        'paid':false,
        'due-amount':0,
        'fine':0,
        'paid-amount':0,
        'paid-date':null 
      }
      this.addFinanceData(all['file-number'], i, state);
      statement.push(state);
    }
    all['fin-statement'] = statement; 
  }

  getFinanceData(fileId:any, duration:any) {
      return this.afs.collection('members').doc(fileId).collection('finance', ref=>ref.where('sno', '<=', duration)).valueChanges();
  }

  addInvestor(inputs:any, id:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('investors').doc(`${inputs.mobile}`).set(inputs).then(res=> {
        this.addInvestorFin(inputs, id);
      },
      err=> {
        reject(err)
      })

    })
  }

  updateInsvestorTotal(total:any, mobile:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('investors').doc(`${mobile}`).set({'amount': total}, {merge:true}).then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

  addInvestorFin(inputs:any, id:any){
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('investors').doc(`${inputs.mobile}`).collection('finance').doc(`${id}`).set(
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
      },
      err=> {
        reject(err)
      })

    })
  }

  deleteInvestorFinance(mobile:any, financeIndex:any) {
    new Promise<any>((resolve, reject) =>{
      this.afs.collection('investors').doc(`${mobile}`).collection('finance').doc(`${financeIndex}`).delete().then(res=> {
      },
      err=> {
        reject(err)
      })

    })
  }

}
