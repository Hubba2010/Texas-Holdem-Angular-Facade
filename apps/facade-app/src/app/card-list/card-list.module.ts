import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardListComponent } from './card-list.component';
import { CardModule } from '../card/card.module';
import { MaterialModule } from '../../../../../libs/shared/material.module';

@NgModule({
  declarations: [CardListComponent],
  exports: [CardListComponent],
  imports: [CommonModule, CardModule, MaterialModule],
})
export class CardListModule {}
