import { Injectable } from '@angular/core';
import { CARD_RANKS, SYMBOLS } from 'consts';
import { BehaviorSubject } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class CardManageService {
  availableCards$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  usedCards$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

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

  public drop(event: CdkDragDrop<string[]>) {
    console.log(event.container);
    console.log(event.previousContainer);
    if (event.previousContainer === event.container) {
      console.log('foo');
      return;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
