import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http:HttpClient) { }

  requests = new Subject<any>();
  oneReq = new Subject<any>();

  ///////////// ALL REQUESTS ///////////////
  getRequests(){
    this.http.get('http://localhost:3000/api/request/getAllRequests').subscribe(
      (data : any) => {
        this.requests.next(data.request);
      }
    );
  }
  requestsUpdateListener(){
    return this.requests.asObservable();
  }
  
  ///////////// ONE REQUEST ///////////////
  getRequest(id){
    this.http.get('http://localhost:3000/api/request/getRequestById/'+id).subscribe(
      (data : any) => {
        this.oneReq.next(data.request);
      }
    );
  }
  oneReqUpdateListener(){
    return this.oneReq.asObservable();
  }
}
