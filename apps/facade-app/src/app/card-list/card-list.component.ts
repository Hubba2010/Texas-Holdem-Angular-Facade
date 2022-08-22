import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardManageService } from 'app/card-manage.service';
import { CARD_RANKS, SYMBOL_NAMES } from 'consts';

@Component({
  selector: 'facade-app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  cardsArray$ = this.facadeService.availableCards$;

  constructor(private facadeService: CardManageService) {}

  CARD_RANKS = CARD_RANKS.slice().reverse();
  SYMBOL_NAMES = SYMBOL_NAMES;
}
