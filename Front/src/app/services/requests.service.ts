import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http:HttpClient) { }

  requests = new Subject<any>();

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
}
