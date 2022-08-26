import { Injectable } from '@angular/core';
import { CARD_RANKS, SYMBOLS } from 'consts';
import { sortCards } from 'utils/card-sorting-fn';
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

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
  combination: string[] = [];

  constructor() {
    this.getAllCards();
  }

  getAllCards(): void {
    const cardsArray: string[] = [];
    const reversedRanks = CARD_RANKS.slice().reverse();
    SYMBOLS.forEach((symbol) => {
      reversedRanks.forEach((rank) => {
        cardsArray.push(`${rank}${symbol}`);
      });
    });
    this.availableCards$.next(cardsArray);
  }

  drop(event: CdkDragDrop<string[]>): void {
    const previousIndex = +event.previousContainer.element.nativeElement.id.slice(
      -1
    );
    const index = +event.container.element.nativeElement.id.slice(-1);
    if (
      event.previousContainer === event.container ||
      this.cardsObject[index]
    ) {
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
      this.cardsObjectSub$.next(this.cardsObject);
      this.combination = Object.values(this.cardsObject);
    }
  }
  return(event: CdkDragDrop<string[]>): void {
    const index = +event.previousContainer.element.nativeElement.id.slice(-1);
    if (event.previousContainer === event.container) {
      return;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousContainer.data.indexOf(this.cardsObject[index]),
        event.previousIndex
      );
      delete this.cardsObject[index];
      sortCards(event.container.data);
      this.cardsObjectSub$.next(this.cardsObject);
      this.combination = Object.values(this.cardsObject);
    }
  }
}
