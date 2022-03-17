import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CLS';
  favIcon: HTMLLinkElement = document.querySelector('#appIcon');
  constructor(private WebsocketService : WebsocketService) {
    this.favIcon.href = './../assets/logo-icon.png';
    this.socket = io.connect('http://127.0.0.1:3000');

  }
  private socket: any;
  public data: any;

  ngOnInit(): void {
    this.WebsocketService.listen("test event").subscribe((data) => {
      // console.log(data)
    })
    this.socket.on('test event', data => {
      this.data = data;
      //console.log(data)
    });
  }
}
