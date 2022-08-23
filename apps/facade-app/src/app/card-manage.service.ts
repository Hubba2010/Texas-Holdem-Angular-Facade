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
  cardsObjectSub$: BehaviorSubject<{
    [key: number | string]: string;
  }> = new BehaviorSubject<{ [key: number | string]: string }>({});
  cardsObject: { [key: number | string]: string } = {};

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
    console.log(event.previousContainer);
    console.log(event.container);
    const previousIndex = +event.previousContainer.element.nativeElement.id.slice(
      -1
    );
    const index = +event.container.element.nativeElement.id.slice(-1);
    // console.log(index);
    if (
      event.previousContainer === event.container ||
      this.cardsObject[index]
    ) {
      console.log('foo');
      return;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.cardsObject = {
        ...this.cardsObject,
        [index]: this.cardsObject[previousIndex] || event.container.data[0],
      };

      if (this.cardsObject[previousIndex] === this.cardsObject[index]) {
        delete this.cardsObject[previousIndex];
      }
      console.log(this.cardsObject);
      this.cardsObjectSub$.next(this.cardsObject);
    }
  }
  public return(event: CdkDragDrop<string[]>) {
    console.log(event.container);
    console.log(event.previousContainer);
    const index = +event.previousContainer.element.nativeElement.id.slice(-1);
    console.log(index);
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
