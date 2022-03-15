import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices-details',
  templateUrl: './invoices-details.component.html',
  styleUrls: ['./invoices-details.component.css']
})
export class InvoicesDetailsComponent implements OnInit {

  constructor(private invoiceService : InvoicesService , private route : ActivatedRoute) { }
  invoice : any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invoiceService.getInvoiceById(params.id).subscribe((invoice : any)=>{
        this.invoice = invoice;
      });
    })
  }

}
