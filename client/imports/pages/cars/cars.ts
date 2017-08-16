import { Component, OnInit } from '@angular/core';
import { Cars, Runs } from '../../../../imports/collections';
import template from './cars.html';
import { Car, Run } from '../../../../imports/models';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
  selector: 'cars',
  template
})
export class CarsPage implements OnInit {
  cars: Observable<Car[]>;
  runs: Observable<Run[]>;

  constructor() {
  }

  public startRun(car: Car) {
    car.lastRun = {
      carId: car._id,
      start: Moment().toDate(),
      end: Moment().toDate(),
      finished: false
    };

    Runs.insert(car.lastRun).subscribe((runId) => {
      car.lastRun._id = runId;
    });
  }

  public stopRun(car: Car) {
    car.lastRun.end = Moment().toDate();
    car.lastRun.finished = true;
    Runs.update({ _id: car.lastRun._id }, car.lastRun).subscribe(() => {
    });
  }

  public cancelRun(car: Car) {
    if (car.lastRun._id)
      Runs.remove(car.lastRun._id).subscribe(() => {
        car.lastRun = {
          carId: car._id,
          start: Moment().toDate(),
          end: Moment().toDate(),
          finished: false
        };
      });

  }

  ngOnInit() {
    this.cars = Runs
      .find({}, { sort: { start: -1 } })
      .combineLatest(Cars.find({ year: 2017 }), (runs, cars) => {
        return cars.map(car => {
          const filteredRuns = runs.filter(r => car._id === r.carId);
          car.lastRun = filteredRuns[0];
          car.runs = filteredRuns.length;
          return car;
        })
          .sort((a, b) => a.lastRun && a.lastRun.finished || a.runs < b.runs ? -1 : 1);
      })
      .do(values => {
        console.log(values, 'values');
      })
      .zone();
  }
}