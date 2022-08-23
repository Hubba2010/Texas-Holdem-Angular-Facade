import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardListModule } from './card-list/card-list.module';
import { MainModule } from './main/main.module';
import { MaterialModule } from '../../../../libs/shared/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CardListModule, MainModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
