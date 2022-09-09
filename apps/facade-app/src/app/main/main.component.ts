import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ManagementService } from 'app/management.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BTN_TYPES } from 'consts';

@Component({
  selector: 'facade-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  BTN_TYPES = BTN_TYPES;
  combinationName$ = this.facadeService.combinationName$;
  cardsObject$ = this.facadeService.cardsObjectSub$;
  usedCards: string[] = [];
  constructor(private facadeService: ManagementService) {}

  dropCard(event: CdkDragDrop<string[]>): void {
    this.facadeService.drop(event);
  }

  resetCards(): void {
    this.facadeService.reset();
    this.usedCards = [];
  }

  checkCombination(): void {
    this.facadeService.checkCombination();
  }
}
