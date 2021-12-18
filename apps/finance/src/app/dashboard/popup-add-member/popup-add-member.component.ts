import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'finance-dashboard-popup-add-member',
  templateUrl: './popup-add-member.component.html',
  styleUrls: ['./popup-add-member.component.css']
})
export class PopupAddMemberComponent implements OnInit {
  addFormGroup: any;
  errorInvalid:string = "Field is required";
  fileError:string = this.errorInvalid;
  showRef:boolean= false;
  propDisable:boolean = true;
  constructor(private formBuilder:FormBuilder, private dialogRef:MatDialogRef<PopupAddMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service:DataServiceService) {
   }

  ngOnInit(): void { 
    if(this.data.request == 'add') {
      this.addFormGroup = this.formBuilder.group({
        'file-number': [null, [Validators.required]],
        'name':[null, [Validators.required]],
        'fname':[null, [Validators.required]],
        'town':[null, [Validators.required]],
        'city':[null, [Validators.required]],
        'district':[null, [Validators.required]],
        'duration':[null, [Validators.required]],
        'doc-charge':[null, [Validators.required]],
        'vehicle':[null, [Validators.required]],
        'mobile':[null, [Validators.required]],
        'mobile-2':[null, [Validators.required]],
        'vehicle-model':[null, [Validators.required]],
        'rc':[null, []],
        'insurance':[null, []],
        'key':[null, []],
        'total-amount':[null, [Validators.required]],
        'date-selection':[null, [Validators.required]],
        'reference-by':[null, []],
        'ref-name': [null, []],
        'ref-mobile': [null, []],
        'ref-amount':[null, []]  
      });

    } else if(this.data.request == 'update') {
      this.addFormGroup = this.formBuilder.group({
        'file-number': [this.data.member['file-number'], [Validators.required]],
        'name':[this.data.member['name'], [Validators.required]],
        'fname':[this.data.member['fname'], [Validators.required]],
        'town':[this.data.member['town'], [Validators.required]],
        'city':[this.data.member['city'], [Validators.required]],
        'district':[this.data.member['district'], [Validators.required]],
        'doc-charge':[this.data.member['doc-charge'], [Validators.required]],
        'vehicle':[this.data.member['vehicle'], [Validators.required]],
        'mobile':[this.data.member['mobile'], [Validators.required]],
        'mobile-2':[this.data.member['mobile-2'], [Validators.required]],
        'vehicle-model':[this.data.member['vehicle-model'], [Validators.required]],
        'rc':[this.data.member['rc'], []],
        'insurance':[this.data.member['insurance'], []],
        'key':[this.data.member['key'], []],
        'total-amount':[this.data.member['total-amount'], [Validators.required]],
        'duration':[this.data.member['duration'], [Validators.required]],
        'date-selection':[this.data.member['date-selection'].toDate(), [Validators.required]],
        'reference-by':[this.data.member['reference-by'], []],
        'ref-name': [this.data.member['ref-name'], []],
        'ref-mobile': [this.data.member['ref-mobile'], []],
        'ref-amount':[this.data.member['ref-amount'], []]  
      });
      this.addFormGroup.controls['file-number'].disable();
      this.showReference(this.data.member['reference-by']);
    }

  }
showReference(data: any) {
  this.showRef =data; 
}

closePop() {
  this.dialogRef.close();
}

checkExFile(file:any) {
  if(this.data.exists.includes(file)) {
    this.addFormGroup.controls['file-number'].setErrors({'incorrect': true});
    this.fileError = 'File number already exists';
  } else {
    // this.addFormGroup.controls['file-number'].setErrors(null);
    this.fileError = this.errorInvalid;
  }
}

addMember(inputs:any, status:any) {
  if(status == "VALID") {
    this.financeCalcluation(inputs, inputs['total-amount'], inputs['doc-charge'], inputs['ref-amount'], inputs['duration']);
  }

}

financeCalcluation(all:any, total: any, doc: any, reference: any, duration:any) {
  var interest = this.service.interest;
  var interestPerMonth = (interest/100)*(total+doc+reference);
  var totalInterest = interestPerMonth * duration;
  var totalAmount = total+doc+reference+totalInterest;
  var emiPerMonth = totalAmount/duration;
  all['interest'] = interest;
  all['interestPerMonth'] = interestPerMonth;
  all['totalInterest'] = totalInterest;
  all['totalAmount'] = totalAmount;
  all['emiPerMonth'] = emiPerMonth;
  this.doneBy(all);
  
}



doneBy(formInputs:any) {
  if(this.data.request == 'add') {
    formInputs['created']= new Date();
    formInputs['created-by'] = this.service.userName.value;
  } else if(this.data.request == 'update') {
    if((formInputs['duration'] != this.data.member['duration']) || (formInputs['date-selection'] != this.data.member['date-selection']))
    this.deleteMember(); // to delete exisiting docs before updating with new duration
    formInputs['created']= this.data.member['created'];
    formInputs['created-by'] = this.data.member['created-by'];
    formInputs['updated']= new Date();
    formInputs['updated-by'] = this.service.userName.value;
  }
  formInputs['status'] = 'new';
  this.addMemberDB(formInputs);
}

deleteMember() {
  for(let i = 1;i<=this.data.member['duration'];i++) {
    this.service.deleteMemberFinance(this.data.member['file-number'], i);
  }
}


addMemberDB(formInputs:any) {
  
  this.service.addMember(formInputs['file-number'], formInputs, this.data);
  this.closePop(); 
}

// durationStatement(all:any) {
//   var date = new Date();
//   var todayDate = date.getDate();
//   var duration = all.duration;
//   var statement = [];
//   var monthlyEMI = all.emiPerMonth;
//   for(let i=1;i<=duration;i++){
//     let dueDate = new Date(date.getFullYear(), date.getMonth()+i, todayDate);
//     let state = {
//       'due-date':dueDate,
//       'sno' : i,
//       'monthly-emi': monthlyEMI,
//       'paid':false 
//     }
//     this.service.addFinanceData(all['file-number'], i, state);
//     statement.push(state);
//   }
//   console.log('emi state', statement);
//   all['fin-statement'] = statement; 
//   this.closePop(); 
// }


}
