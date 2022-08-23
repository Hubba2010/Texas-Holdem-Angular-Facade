import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'facade-app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolderComponent {}
