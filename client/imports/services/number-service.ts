import { Injectable } from '@angular/core';
import { Cars } from '../../../imports/collections';
import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

@Injectable()
export class NumberService {
    currentValue: number;

    constructor() {
        this.currentValue = 100;

        Cars.find({}, { sort: { startNumber: -1 }, limit: 1 })
            .subscribe(car => this.currentValue = car.length > 0 ? car[0].startNumber : 0);
    }

    getCurrentValue(): number {
        return ++this.currentValue;
    }
}