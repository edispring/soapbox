import { MongoObservable } from 'meteor-rxjs';
import { Car } from '../models';
 
export const Cars = new MongoObservable.Collection<Car>('cars');