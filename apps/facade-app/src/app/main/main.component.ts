import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ManagementService } from 'app/management.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BTN_TYPES } from 'consts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'facade-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnDestroy {
  BTN_TYPES = BTN_TYPES;
  subscription$: Subscription;
  combinationName = '';
  cardsObject$ = this.facadeService.cardsObjectSub$;
  usedCards: string[] = [];
  constructor(private facadeService: ManagementService) {
    this.subscription$ = this.facadeService.combinationName$.subscribe(
      (combination) => {
        this.combinationName = combination;
      }
    );
  }

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

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
