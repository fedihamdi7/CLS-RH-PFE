import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {

  //Variables
  form : FormGroup;
  indexTab :number;
  constructor(@Inject(MAT_DIALOG_DATA) public data : {id:string} ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      date_signature : new FormControl(null),
      expires_at : new FormControl(null),
      paymentDate : new FormControl(null),
      amount : new FormControl(null),
      dueDate : new FormControl(null),
      globalAmount : new FormControl(null),
      slices : new FormControl(null),
      amountEachSlice : new FormControl(null),
    });
  }

  onTabChange(){
    this.form.get('paymentDate').setValue(null);
    this.form.get('amount').setValue(null);
    this.form.get('dueDate').setValue(null);
    this.form.get('globalAmount').setValue(null);
    this.form.get('slices').setValue(null);
    this.form.get('amountEachSlice').setValue(null);
  }
}
