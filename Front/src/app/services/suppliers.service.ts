import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }
  suppliers = new Subject<any>();

  getSuppliers(){
    this.http.get('http://localhost:3000/api/supplier/getAllSuppliers').subscribe((data: any) =>{
      this.suppliers.next(data.suppliers);
    });
  }
  addSupplier(supplier : any){
    return this.http.post('http://localhost:3000/api/supplier/addSupplier',supplier);
  }

  getContractBySupplierId(id: string){
    return this.http.get('http://localhost:3000/api/contract/getContractBySupplierId/'+id);
  }

  suppliersUpdateListener(){
    return this.suppliers.asObservable();
  }
}
