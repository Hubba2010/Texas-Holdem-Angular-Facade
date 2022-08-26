import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { BTN_TYPES } from 'consts';

@Component({
  selector: 'facade-app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();
  @Input() isDisabled?: boolean;
  @Input() type: string = BTN_TYPES.PRIMARY;
  BTN_TYPES = BTN_TYPES;

  click(): void {
    this.clicked.emit()
  }
}
