import { Exercise } from "./exercise";

export class Routine {
    id: string;
    name: string;
    exercises: Exercise[];
    owner: string;
    readers: string[];
    writers: string[];

    constructor(name: string, owner: string, id?: string, exercises?: Exercise[]) {
        this.id = id ?? (Math.floor(Math.random() * 100) + Date.now()).toString();
        this.name = name;
        this.exercises = exercises ?? [];
        this.readers = [];
        this.writers = [];
        this.owner = owner;
    }
}
