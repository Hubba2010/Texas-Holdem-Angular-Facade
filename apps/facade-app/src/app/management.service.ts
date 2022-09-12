import { Injectable } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { CARD_RANKS, SYMBOLS } from 'consts';
import { checkCombination } from '../utils/check-combination';
import { sortCards } from 'utils/card-sorting-fn';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  availableCards$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  cardsObjectSub$: BehaviorSubject<{
    [key: number | string]: string;
  }> = new BehaviorSubject<{ [key: number | string]: string }>({});
  combinationName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
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

  reset(): void {
    this.cardsObjectSub$.next({});
    this.cardsObject = {};
    this.combination = [];
    this.combinationName$.next('');
    this.getAllCards();
  }

  checkCombination(): void {
    const combinationName = checkCombination(this.combination).type;
    this.combinationName$.next(combinationName);
  }
}
