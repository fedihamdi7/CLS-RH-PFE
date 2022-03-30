import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http:HttpClient) { }

  getAllContracts (){
    return this.http.get('http://localhost:3000/api/contract/getAllContracts');
  }
  getContractById (id : string){
    return this.http.get('http://localhost:3000/api/contract/getContractById/'+id);
  }

  addContract(contract: Contract){
    return this.http.post('http://localhost:3000/api/contract/addContract',contract);
  }
}
