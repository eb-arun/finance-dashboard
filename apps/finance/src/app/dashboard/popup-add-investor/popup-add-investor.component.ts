import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'finance-dashboard-popup-add-investor',
  templateUrl: './popup-add-investor.component.html',
  styleUrls: ['./popup-add-investor.component.scss']
})
export class PopupAddInvestorComponent implements OnInit {
  addInFormGroup: any;
  errorInvalid:string = "Field is required";
  constructor(private formBuilder:FormBuilder, private dialogRef:MatDialogRef<PopupAddInvestorComponent>) { }

  ngOnInit(): void {
    this.addInFormGroup = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'date-selection': [null, [Validators.required]],
      'amount': [null, [Validators.required]]
    })
  };

  closePop() {
    this.dialogRef.close();
  }
}
