import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HolderComponent } from './holder.component';

@NgModule({
  declarations: [HolderComponent],
  exports: [HolderComponent],
  imports: [CommonModule],
})
export class HolderModule {}
