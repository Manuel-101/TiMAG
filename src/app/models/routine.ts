import { Exercise } from "./exercise";

export class Routine {
    id: number;
    name: string;
    exercises: Exercise[];

    constructor(name: string, id?: number, exercises?: Exercise[]) {
        this.id = id ?? Math.floor(Math.random() * 100) + Date.now();
        this.name = name;
        this.exercises = exercises ?? [];
    }
}
