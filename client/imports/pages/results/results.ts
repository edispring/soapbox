import { Component, OnInit, OnDestroy } from "@angular/core";
import { Cars, Runs } from "../../../../imports/collections";
import { Car, Run } from "../../../../imports/models";
import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/do";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/concat";
import { MeteorObservable, zoneOperator } from "meteor-rxjs";
import { minBy, groupBy } from "lodash";

@Component({
  templateUrl: "./results.html",
})
export class ResultsPage implements OnInit {
  result$: Observable<any> = Observable.of({ kids: [], bobby: [], adults: [] });
  categories = ["kids", "bobby", "adults"];

  ngOnInit() {
    const cars$ = Runs.find({ finished: true}, { sort: { start: -1 } })
      .combineLatest(Cars.find({ year: 2022 }), (runs, cars) => {
        console.log("🚀 ~ file: results.ts ~ line 21 ~ ResultsPage ~ .combineLatest ~ runs, cars", runs, cars)
        return groupBy(
          cars
            .map(car => {
              const filteredRuns = runs.filter(r => car._id === r.carId && r.finished);
              console.log("----------------------------------------- > file: results.ts > line 26 > ResultsPage > .combineLatest > filteredRuns", filteredRuns)
              const sortedRuns = filteredRuns.sort((a, b) => getDuration(a) - getDuration(b));
              const bestRuns = sortedRuns.slice(0, 2);
              console.log("----------------------------------------- > file: results.ts > line 28 > ResultsPage > .combineLatest > bestRuns", bestRuns)
              const avgRun = bestRuns.reduce((acc, run) => acc + getDuration(run), 0) / bestRuns.length;
              car.bestRun = bestRuns[0] ? { ...bestRuns[0], end: new Date(+bestRuns[0].start  + (avgRun * 1000)) , duration: avgRun} as Run : null;
              console.log("----------------------------------------- > file: results.ts > line 32 > ResultsPage > .combineLatest > avgRun", avgRun)
              car.runs = filteredRuns.length;
              console.log("----------------------------------------- > file: results.ts > line 34 > ResultsPage > .combineLatest > car", car)
              return car;
             
            })
            .filter(c => !!c.bestRun)
            .sort((a, b) => {
              return a.category > b.category ||
              (a.bestRun.duration > b.bestRun.duration)
                ? 1
                : -1;
            }),
          "category"
        );
      })
      .do(x => {
        console.log(x, "cars");
      });

    this.result$ = this.result$.concat(cars$).pipe(zoneOperator()) as any;
  }
}

function getDuration(run: Run) {
  if (!run) return 0;

  return (<any>run.end - <any>run.start) / 1000;
}
