import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CLS';
  favIcon: HTMLLinkElement = document.querySelector('#appIcon');
  constructor() {
    this.favIcon.href = './../assets/logo-icon.png';
  }
}
