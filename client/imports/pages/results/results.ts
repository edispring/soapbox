import { Component, OnInit, OnDestroy } from "@angular/core";
import { Cars, Runs } from "../../../../imports/collections";
import { Car, Run } from "../../../../imports/models";
import { Observable, Subscription } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';
import { MeteorObservable, zoneOperator } from "meteor-rxjs";
import { minBy, groupBy } from "lodash";

@Component({
  templateUrl:"./results.html"
})
export class ResultsPage implements OnInit {
  result$: Observable<{ [category: string]: any[] }> = Observable.from([]);
  categories = ["kids", "bobby", "adults"];

  ngOnInit() {
    const cars$ = Runs.find({}, { sort: { start: -1 } })
      .combineLatest(Cars.find({ year: 2021 }), (runs, cars) => {
        console.log("🚀 ~ file: results.ts ~ line 21 ~ ResultsPage ~ .combineLatest ~ runs, cars", runs, cars)
        return groupBy(
          cars
            .map(car => {
              const filteredRuns = runs.filter(r => car._id === r.carId);
              const bestRun = minBy(filteredRuns, getDuration);
              car.lastRun = bestRun;
              car.runs = filteredRuns.length;
              return car;
            })
            .filter(c => c.lastRun && c.lastRun.finished)
            .sort((a, b) => {
              return a.category > b.category ||
                getDuration(a.lastRun) > getDuration(b.lastRun)
                ? 1
                : -1;
            }),
          "category"
        );
      })
      .do(x => {
        console.log(x, "cars");
      });

    this.result$ = cars$.pipe(zoneOperator()) as any;
  }
}

function getDuration(run: Run) {
  if (!run) return 0;

  return (<any>run.end - <any>run.start) / 1000;
}
