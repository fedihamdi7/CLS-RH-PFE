import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }

  getSuppliers(){
    return this.http.get('http://localhost:3000/api/supplier/getAllSuppliers');
  }
  addSupplier(supplier : any){
    return this.http.post('http://localhost:3000/api/supplier/addSupplier',supplier);
  }
}
