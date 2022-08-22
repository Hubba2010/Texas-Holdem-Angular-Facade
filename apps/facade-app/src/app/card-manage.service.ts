import { Injectable } from '@angular/core';
import { CARD_RANKS, SYMBOLS } from 'consts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardManageService {
  availableCards$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  constructor() {
    console.log('Facade service works!');
    this.getAllCards();
  }

  getAllCards() {
    const cardsArray: string[] = [];
    const reversedRanks = CARD_RANKS.slice().reverse();
    SYMBOLS.forEach((symbol) => {
      reversedRanks.forEach((rank) => {
        cardsArray.push(`${rank}${symbol}`);
      });
    });
    console.log(cardsArray);
    this.availableCards$.next(cardsArray);
  }
}
