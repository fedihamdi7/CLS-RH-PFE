import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoicesService } from 'src/app/services/invoices.service';
import { AddContractComponent } from '../add-contract/add-contract.component';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

   //Variables
   form : FormGroup;
   indexTab :number;
   constructor(@Inject(MAT_DIALOG_DATA) public data : {id:string} ,public dialogRef: MatDialogRef<AddContractComponent>, private invoiceService : InvoicesService, private matSnack: MatSnackBar) { }
 
   ngOnInit(): void {
     this.form = new FormGroup({
       date_signature : new FormControl(null),
       expires_at : new FormControl(null),
       payment_date : new FormControl(null),
       payment_amount : new FormControl(null),
       due_date : new FormControl(null),
       global_amount : new FormControl(null),
       number_of_slices : new FormControl(null),
       payment_each_slice : new FormControl(null),
       method : new FormControl(null),
     });
   }
 
   onSubmit(){
     let status : string = "paid" ;
      switch (this.indexTab) {
       case 0:
         status = 'paid';
         break;
       case 1:
         status = 'not_paid';
         break;
       case 2:
         status = 'paid_by_split';
         break;
       default:
         break;
     };
 
     let data = this.form.value;
     data.payment_status = status;
     data.supplier = this.data.id;
     this.invoiceService.addInvoice(data).subscribe(
       (res :any) => {
         if(res.added){
           this.matSnack.open("Invoice Added", "close", {duration: 2000});
           //close dialog
           this.dialogRef.close();
         }
       }
     );
 
   }
   onTabChange(){
     this.form.get('payment_date').setValue(null);
     this.form.get('payment_amount').setValue(null);
     this.form.get('due_date').setValue(null);
     this.form.get('global_amount').setValue(null);
     this.form.get('number_of_slices').setValue(null);
     this.form.get('payment_each_slice').setValue(null);
     this.form.get('method').setValue(null);
   }

}
