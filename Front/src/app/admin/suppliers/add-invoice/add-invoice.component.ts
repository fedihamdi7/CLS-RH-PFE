import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

   //Variables
   form : FormGroup;
   constructor(@Inject(MAT_DIALOG_DATA) public data : {id:string} ,public dialogRef: MatDialogRef<AddInvoiceComponent>, private invoiceService : InvoicesService, private matSnack: MatSnackBar) { }
 
   ngOnInit(): void {
     this.form = new FormGroup({
       date : new FormControl(null),
       payment_status : new FormControl(null),
       payment_method : new FormControl(null),
       amount : new FormControl(null),
       Amount_excluding_taxes : new FormControl(null),
     });
   }
 
   onSubmit(){
     let data = this.form.value;
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


}
