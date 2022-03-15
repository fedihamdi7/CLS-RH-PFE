import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http:HttpClient) { }

  invoices = new Subject<any>();

  getInvoices(){
    this.http.get('http://localhost:3000/api/invoice/getAllInvoices').subscribe(
      (res:any) => {
        this.invoices.next(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  invoiceUpdateListener(){
    this.getInvoices();
    return this.invoices.asObservable();
  }

  getInvoiceById(id){
    return this.http.get(`http://localhost:3000/api/invoice/getInvoiceById/${id}`);
  }

  getInvoicesBySupplierId(id){
    return this.http.get(`http://localhost:3000/api/invoice/getInvoiceBySupplierId/${id}`);
  }

  addInvoice(invoice : any){
    return this.http.post('http://localhost:3000/api/invoice/addInvoice', invoice);
  }
}
