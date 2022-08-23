import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardManageService } from 'app/card-manage.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'facade-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  subscription$: Subscription;
  usedCards: string[] = [];
  constructor(private facadeService: CardManageService) {
    this.subscription$ = this.facadeService.usedCards$.subscribe(
      (cards: string[]) => {
        this.usedCards = cards;
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    this.facadeService.drop(event);
  }
}
