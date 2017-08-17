export interface Car {
    _id?: string;
    title: string;
    drivers: string[]
    year: number,
    startNumber: number,
    lastRun?: Run
    moving?: boolean;
    runs?: number;
    category: 'kids' | 'adults' | 'bobby'
}

export interface Run {
    _id?: string;
    carId?: string;
    start: Date;
    end?: Date;
    finished: boolean;
    duration?: number;
}