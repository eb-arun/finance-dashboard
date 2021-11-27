import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'finance-dashboard-popup-add-member',
  templateUrl: './popup-add-member.component.html',
  styleUrls: ['./popup-add-member.component.css']
})
export class PopupAddMemberComponent implements OnInit {
  addFormGroup: any;
  errorInvalid:string = "Field is required";
  showRef:boolean= false;

  constructor(private formBuilder:FormBuilder, private dialogRef:MatDialogRef<PopupAddMemberComponent>) { }

  ngOnInit(): void {
    this.addFormGroup = this.formBuilder.group({
      'file-number': [null, [Validators.required]],
      'name':[null, [Validators.required]],
      'fname':[null, [Validators.required]],
      'town':[null, [Validators.required]],
      'city':[null, [Validators.required]],
      'district':[null, [Validators.required]],
      'month-duration':[null, [Validators.required]],
      'vehicle':[null, [Validators.required]],
      'mobile':[null, [Validators.required]],
      'mobile-2':[null, [Validators.required]],
      'vehicle-model':[null, [Validators.required]],
      'rc':[null, []],
      'insurance':[null, []],
      'key':[null, []],
      'total-amount':[null, [Validators.required]],
      'duration':[null, [Validators.required]],
      'ref-amount':[null, [Validators.required]],
      'date-selection':[null, [Validators.required]],
      'reference-by':[null, []],
      'ref-name': [null, []]    
    });

  }
  showReference(data: any) {
console.log(data);
this.showRef =data.checked; 
}

closePop() {
this.dialogRef.close();
}


}
