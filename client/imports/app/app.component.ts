import { Component } from '@angular/core';
import template from "./app.html";

import { CarsPage } from '../pages/cars/cars'
 
@Component({
  selector: 'soapbox-app',
  template
})
export class AppComponent {
  rootPage = CarsPage;

  
}