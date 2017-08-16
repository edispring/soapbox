export interface Car {
    _id?: string;
    title: string;
    drivers: string[]
    year: number,
    number: number,
    lastRun? : Run
    moving?: boolean;
}

export interface Run {
    _id?: string;
    carId?: string;
    start: Date;
    end?: Date;
    finished: boolean;
    duration?: number;
}