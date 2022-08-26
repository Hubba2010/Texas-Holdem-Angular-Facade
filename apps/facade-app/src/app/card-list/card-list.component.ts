import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CardManageService } from 'app/card-manage.service';
import { CARD_RANKS, SYMBOL_NAMES } from 'consts';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'facade-app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnDestroy {
  subscription$: Subscription;
  availableCards$ = this.facadeService.availableCards$;
  cardsArray: string[] = [];

  constructor(private facadeService: CardManageService) {
    this.subscription$ = this.facadeService.availableCards$.subscribe(
      (cards: string[]) => {
        this.cardsArray = cards;
      }
    );
  }

  CARD_RANKS = CARD_RANKS.slice().reverse();
  SYMBOL_NAMES = SYMBOL_NAMES;

  returnCard(event: CdkDragDrop<string[]>): void {
    this.facadeService.return(event);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
