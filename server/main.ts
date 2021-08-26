import { Meteor } from "meteor/meteor";
import * as Moment from "moment";
import { Cars, Runs } from "../imports/collections";
import * from "./methods";

Meteor.startup(() => {
    if (Cars.find({}).cursor.count() === 0) {
      let carId;
      carId = Cars.collection.insert({
        title: 'Wi(d)der Blitz',
        drivers: ['Cristina', 'Carla'],
        year: 2021,
        startNumber: 2,
        category: 'kids'
      });
      Runs.collection.insert({
        carId: carId,
        start: Moment().subtract(2, 'minutes').toDate(),
        end: Moment().toDate(),
        finished: true
      });
      carId = Cars.collection.insert({
        title: 'füür u flamme',
        drivers: ['Timon', 'Levin'],
        year: 2021,
        startNumber: 3,
        category: 'kids'
      });
      Runs.collection.insert({
        carId: carId,
        start: Moment().subtract(3, 'minutes').toDate(),
        end: Moment().toDate(),
        finished: true
      });
    }
});
