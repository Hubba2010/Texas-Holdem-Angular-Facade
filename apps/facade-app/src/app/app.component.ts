import { Component } from '@angular/core';
import { CARD_RANKS } from 'consts';

@Component({
  selector: 'facade-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'facade-app';
  constructor() {
    console.log(CARD_RANKS);
  }
}
