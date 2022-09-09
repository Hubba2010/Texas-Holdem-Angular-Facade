import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ManagementService } from 'app/management.service';
import { CARD_RANKS, SYMBOL_NAMES } from 'consts';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'facade-app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  availableCards$ = this.facadeService.availableCards$;

  constructor(private facadeService: ManagementService) {}

  CARD_RANKS = CARD_RANKS.slice().reverse();
  SYMBOL_NAMES = SYMBOL_NAMES;

  returnCard(event: CdkDragDrop<string[]>): void {
    this.facadeService.return(event);
  }
}
