import { Component } from '@angular/core';
import template from './cars.html';
import { Car } from '../../../../imports/models';
import * as Moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'cars',
  template
})
export class CarsPage {
  cars: Observable<Car[]>;

  constructor() {
    this.cars = this.findCars();
  }

  private findCars(): Observable<Car[]> {
    return Observable.of([
      {
        _id: '0',
        title: 'Wi(d)der Blitz',
        picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
        drivers: ['Cristina', 'Carla'],
        year: 2017,
        number: 2,
        lastRun: {
          start: Moment().subtract(2, 'minutes').toDate(),
          end: Moment().toDate(),
          finished: true
        }
      },
      {
        _id: '1',
        title: 'füür u flamme',
        picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
        drivers: ['Timon', 'Levin'],
        year: 2017,
        number: 3,
        lastRun: {
          start: Moment().subtract(5, 'minutes').toDate(),
          end: Moment().subtract(2, 'minutes').toDate(),
          finished: true
        }
      }]);
  }
}