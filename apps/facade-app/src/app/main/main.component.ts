import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardManageService } from 'app/card-manage.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'facade-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  usedCards: string[] = [];
  cardsObject$ = this.facadeService.cardsObjectSub$;
  constructor(private facadeService: CardManageService) {}

  dropCard(event: CdkDragDrop<string[]>) {
    this.facadeService.drop(event);
  }
}
