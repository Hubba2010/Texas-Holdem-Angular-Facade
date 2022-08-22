import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardListComponent } from './card-list.component';
import { CardModule } from '../card/card.module';

@NgModule({
  declarations: [CardListComponent],
  exports: [CardListComponent],
  imports: [CommonModule, CardModule],
})
export class CardListModule {}
