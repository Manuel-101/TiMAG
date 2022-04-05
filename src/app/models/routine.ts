import { Exercise } from "./exercise";

export class Routine {
    id: string;
    name: string;
    exercises: Exercise[];
    owner: string;
    readers: string[];
    writers: string[];

    constructor(name: string, owner: string, exercises?: Exercise[]) {
        this.name = name;
        this.exercises = exercises ?? [];
        this.readers = [];
        this.writers = [];
        this.owner = owner;
    }
}
