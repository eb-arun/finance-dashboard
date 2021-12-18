import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'finance-dashboard-popup-add-investor',
  templateUrl: './popup-add-investor.component.html',
  styleUrls: ['./popup-add-investor.component.scss']
})
export class PopupAddInvestorComponent implements OnInit {
  addInFormGroup: any;
  errorInvalid:string = "Field is required";
  constructor(private formBuilder:FormBuilder, private dialogRef:MatDialogRef<PopupAddInvestorComponent>, private service:DataServiceService) { }

  ngOnInit(): void {
    this.addInFormGroup = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'mobile': [null, [Validators.required]],
      'date-selection': [null, [Validators.required]],
      'amount': [null, [Validators.required]]
    })
  };

  addInvestor(inputs:any, valid:any){
    if(valid == 'VALID'){
      inputs['created']= new Date();
      inputs['created-by'] = this.service.userName.value;
      this.service.addInvestor(inputs, '1');
      this.closePop();
    }
  }

closePop() {
    this.dialogRef.close();
  }
}
