import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { GlobalErrorHandler } from '../errorhandling/global-error-handler';

import { AppComponent } from './app.component';

import { CarsPage } from '../pages/cars/cars';


@NgModule({
  declarations: [
    AppComponent,
    CarsPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler  }],
  bootstrap: [AppComponent]
})
export class AppModule { }