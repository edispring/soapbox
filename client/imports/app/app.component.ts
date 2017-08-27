import { Component } from '@angular/core';
import { Router } from '@angular/router';
import template from "./app.html";

import { CarsPage } from '../pages/cars/cars'

@Component({
  selector: 'soapbox-app',
  template
})
export class AppComponent {
  rootPage = CarsPage;

  constructor(private router: Router) {
  }

  public createCar() {
    this.router.navigate(['/cars', 'create']);
  }
}