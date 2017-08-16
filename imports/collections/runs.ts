import { MongoObservable } from 'meteor-rxjs';
import { Run } from '../models';
 
export const Runs = new MongoObservable.Collection<Run>('runs');