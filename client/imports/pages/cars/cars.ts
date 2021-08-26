import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Cars, Runs } from "../../../../imports/collections";
import { Car, Run } from "../../../../imports/models";
import * as Moment from "moment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/combineLatest';
import { Observable, Subscription } from "rxjs";
import { MeteorObservable, zoneOperator } from "meteor-rxjs";

@Component({
  templateUrl: "./cars.html"
})
export class CarsPage implements OnInit, OnDestroy {
  cars$: Observable<Car[]>;
  runs: Observable<Run[]>;
  currentCar: Car & { time?: number };
  timer$: Subscription;
  carsSubscription: Subscription;

  constructor(private router: Router) {
    this.currentCar = <any>{};
  }

  private startTimer(car: Car & { time?: number }) {
    const source = Observable.timer(this.currentCar.time || 100, 100);

    this.removeTimer();

    console.log(":::START:timer");

    this.timer$ = source.subscribe(x => {
      this.currentCar.time = x / 10;
    });
  }

  private removeTimer() {
    if (this.timer$ && !this.timer$.closed) {
      this.timer$.unsubscribe();
      console.log(":::REMOVE:timer");
    }
  }

  public startRun(car: Car) {
    car.lastRun = {
      carId: car._id,
      start: Moment().toDate(),
      end: Moment().toDate(),
      finished: false
    };

    this.currentCar = car;
    this.currentCar.time = 0;

    this.startTimer(this.currentCar);

    Runs.insert(car.lastRun).subscribe(runId => {
      car.lastRun._id = runId;
    });
  }

  public stopRun(car: Car) {
    car.lastRun.end = Moment().toDate();
    car.lastRun.finished = true;

    this.removeTimer();
    this.currentCar.time =
      (<any>car.lastRun.end - <any>car.lastRun.start) / 1000;

    Runs.update({ _id: car.lastRun._id }, car.lastRun).subscribe(() => {});
  }

  public cancelRun(car: Car) {
    if (car.lastRun._id) {
      Runs.remove(car.lastRun._id).subscribe(() => {
        car.lastRun = {
          carId: car._id,
          start: Moment().toDate(),
          end: Moment().toDate(),
          finished: false
        };
      });
    }

    this.removeTimer();
    this.currentCar.time =
      (<any>car.lastRun.end - <any>car.lastRun.start) / 1000;
  }

  public onSelect(car: Car) {
    this.router.navigate(["/cars", car._id]);
  }

  ngOnInit() {
    const cars$ = Runs.find({}, { sort: { start: -1 } })
      .combineLatest(Cars.find({ year: 2021 }), (runs, cars) => {
        return cars
          .map(car => {
            const filteredRuns = runs.filter(r => car._id === r.carId);
            car.lastRun = filteredRuns[0];
            car.runs = filteredRuns.length;
            return car;
          })
          .sort((a, b) => {
            return a.category > b.category || a.startNumber > b.startNumber
              ? 1
              : -1;
          });
      })
      .do(x => {
        console.log(x, "cars");
      });

    this.cars$ = cars$.pipe(zoneOperator()) as any;

    this.carsSubscription = cars$.subscribe(cars => {
      const carsRunning = cars.filter(x => x.lastRun && !x.lastRun.finished);
      if (carsRunning && carsRunning.length > 0) {
        this.currentCar = carsRunning[0];
        this.currentCar.time =
          (<any>this.currentCar.lastRun.end -
            <any>this.currentCar.lastRun.start) /
          1000;
        this.startTimer(this.currentCar);
        console.log(this.currentCar, "currentCar");
      } else if (this.timer$) {
        this.removeTimer();
      }
    });
  }

  ngOnDestroy() {
    this.carsSubscription.unsubscribe();
  }
}
