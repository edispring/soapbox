import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { GlobalErrorHandler } from '../errorhandling/global-error-handler';

import { AppComponent } from './app.component';

import { NumberService } from '../services/number-service';

import { CarsPage } from '../pages/cars/cars';
import { ResultsPage } from '../pages/results/results';
import { CarsDetailPage } from '../pages/cars-detail/cars-detail';

const appRoutes: Routes = [
  { path: 'results', component: ResultsPage },
  { path: 'cars/:id', component: CarsDetailPage },
  {
    path: 'cars',
    component: CarsPage,
    data: { title: 'Cars List' }
  },
  {
    path: '',
    redirectTo: '/cars',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CarsPage,
    ResultsPage,
    CarsDetailPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }, NumberService],
  bootstrap: [AppComponent]
})
export class AppModule { }