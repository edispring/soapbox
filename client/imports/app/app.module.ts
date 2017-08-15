import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { GlobalErrorHandler } from '../errorhandling/global-error-handler';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler  }],
  bootstrap: [AppComponent]
})
export class AppModule { }