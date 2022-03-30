import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private url : string = environment.api_URL+"/api/contract/"; 

  constructor(private http:HttpClient) { }

  getAllContracts (){
    return this.http.get(`${this.url}getAllContracts`);
  }
  getContractById (id : string){
    return this.http.get( `${this.url}getContractById` +id);
  }

  addContract(contract: Contract){
    return this.http.post(`${this.url}addContract`,contract);
  }
}
