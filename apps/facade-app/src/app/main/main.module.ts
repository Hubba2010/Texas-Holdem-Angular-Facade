import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { HolderModule } from 'app/holder/holder.module';
import { CardModule } from 'app/card/card.module';
import { ButtonModule } from 'app/button/button.module';
import { MaterialModule } from '../../../../../libs/shared/material.module';

@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent],
  imports: [
    CommonModule,
    HolderModule,
    MaterialModule,
    CardModule,
    ButtonModule,
  ],
})
export class MainModule {}
