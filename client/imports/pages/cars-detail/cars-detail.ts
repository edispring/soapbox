import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import { Cars } from "../../../../imports/collections";
import { Car } from "../../../../imports/models";
import { Observable, Subscription } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { first, drop } from "lodash";
import { NumberService } from "../../services/number-service";

@Component({
  templateUrl:"./cars-detail.html"
})
export class CarsDetailPage implements OnInit {
  car: Car & { driver1: string; driver2: string };
  carSubscription: Subscription;
  createMode = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private numberService: NumberService
  ) {
    this.car = <any>{};
  }

  public save() {
    this.car.drivers = [this.car.driver1, this.car.driver2];

    if (this.createMode) {
      this.car.year = 2022;
      console.log("TCL: CarsDetailPage -> save -> car", this.car);
      return Cars.insert(this.car)
        .do(() => console.log(this.car, "CREATED"))
        .subscribe(() => {
          this.location.back();
        });
    }

    Cars.update({ _id: this.car._id }, this.car)
      .do(() => console.log(this.car, "SAVED"))
      .subscribe(() => {
        this.location.back();
      });
  }

  public delete() {
    const id = this.car._id;
    Cars.remove(id)
      .do(() => console.log(id, "DELETED"))
      .subscribe(() => {
        this.car = <any>{};
        this.location.back();
      });
  }

  public cancel() {
    this.location.back();
  }

  ngOnInit() {
    this.carSubscription = this.route.paramMap
      .do(d => console.log("ID:" + d.get("id")))
      .switchMap((params: ParamMap) => {
        const id = params.get("id");
        if (id === "create") {
          this.createMode = true;
          return Observable.of([
            (<any>{
              drivers: [],
              startNumber: this.numberService.getCurrentValue()
            }) as Car
          ]);
        }

        return <any>Cars.find({ _id: id });
      })
      .subscribe(car => {
        this.car = first(car);

        if (this.car) {
          this.car.driver1 = first(this.car.drivers);
          this.car.driver2 = first(drop(this.car.drivers));
        }
      });
  }

  ngOnDestroy() {
    if(this.carSubscription && this.carSubscription.unsubscribe) this.carSubscription.unsubscribe();
  }
}
