import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  socket: any;
  readonly uri:string="http://localhost:3000/";
  constructor() {
    this.socket=io.connect(this.uri);
  }
  listen(eventName:string){
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
          observer.next(data);
      });
  });
  }
  emit(eventName:string,data:any){
    this.socket.emit(eventName,data);
  }
}
