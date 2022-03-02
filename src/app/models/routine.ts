import { Exercise } from "./exercise";

export class Routine {
    id: string;
    name: string;
    exercises: Exercise[];

    constructor(name: string, id?: string, exercises?: Exercise[]) {
        this.id = id ?? (Math.floor(Math.random() * 100) + Date.now()).toString();
        this.name = name;
        this.exercises = exercises ?? [];
    }
}
