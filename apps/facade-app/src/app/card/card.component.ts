import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'facade-app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() rank!: string;
  @Input() symbol!: string;
  symbolName?: string;

  ngOnInit(): void {
    switch (this.symbol) {
      case '♠':
        this.symbolName = 'spade';
        break;
      case '♥':
        this.symbolName = 'heart';
        break;
      case '♣':
        this.symbolName = 'club';
        break;
      case '♦':
        this.symbolName = 'diamond';
    }
  }
}
