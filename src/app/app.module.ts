import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconModule } from './shared/custom-icon/icon.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, IconModule, IvyCarouselModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
