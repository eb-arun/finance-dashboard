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
  showRef:boolean= false;
  propDisable:boolean = true;
  constructor(private formBuilder:FormBuilder, private dialogRef:MatDialogRef<PopupAddMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service:DataServiceService) { }

  ngOnInit(): void {
    this.addFormGroup = this.formBuilder.group({
      'file-number': [null, [Validators.required]],
      'name':[null, [Validators.required]],
      'fname':[null, [Validators.required]],
      'town':[null, [Validators.required]],
      'city':[null, [Validators.required]],
      'district':[null, [Validators.required]],
      'month-duration':[null, [Validators.required]],
      'doc-charge':[null, [Validators.required]],
      'vehicle':[null, [Validators.required]],
      'mobile':[null, [Validators.required]],
      'mobile-2':[null, [Validators.required]],
      'vehicle-model':[null, [Validators.required]],
      'rc':[null, []],
      'insurance':[null, []],
      'key':[null, []],
      'total-amount':[null, [Validators.required]],
      'duration':[null, [Validators.required]],
      'date-selection':[null, [Validators.required]],
      'reference-by':[null, []],
      'ref-name': [null, []],
      'ref-mobile': [null, []],
      'ref-amount':[null, []]  
    });

  }
  showReference(data: any) {
console.log(data);
this.showRef =data.checked; 
}

closePop() {
this.dialogRef.close();
}

addMember(inputs:any) {
  console.log('add form data', inputs);
  if(inputs.status == "VALID") {
    this.financeCalcluation(inputs.value, inputs.value['total-amount'], inputs.value['doc-charge'], inputs.value['ref-amount'], inputs.value['duration']);
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
  this.durationStatement(all);
  
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
    statement.push(state);
  }
  console.log('emi state', statement);
  all['fin-statement'] = statement;
  this.addMemberDB(all);
}

addMemberDB(formInputs:any) {
  formInputs['created']= new Date();
  formInputs['creadted-by'] = this.service.userName.value;
  this.service.addMember(formInputs['file-number'], formInputs);
  console.log('final add values', formInputs);
  this.closePop();
}



}
