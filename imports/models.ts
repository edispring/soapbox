export interface Car {
    _id: string;
    title: string;
    picture: string;
    drivers: string[]
    year: number,
    number: number,
    lastRun : Run
}

export interface Run {
    _id?: string;
    carId?: string;
    start: Date;
    end?: Date;
    finished: boolean;
    duration?: number;
}