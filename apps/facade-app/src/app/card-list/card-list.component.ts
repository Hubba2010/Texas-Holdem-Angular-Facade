import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class CardListComponent {
  subscription$: Subscription;
  cardsArray: string[] = [];

  constructor(private facadeService: CardManageService) {
    this.subscription$ = this.facadeService.availableCards$.subscribe(
      (cards: string[]) => {
        this.cardsArray = cards;
      }
    );
    console.log(this.cardsArray);
  }

  CARD_RANKS = CARD_RANKS.slice().reverse();
  SYMBOL_NAMES = SYMBOL_NAMES;

  returnCard(event: CdkDragDrop<string[]>) {
    this.facadeService.return(event);
  }
}
