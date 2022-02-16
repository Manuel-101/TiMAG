import { Time } from "@angular/common";

export class Exercise {
    id: string;
    name: string;
    desc: string;
    time: string;

    constructor(id?: string, name: string, desc: string, time: string) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.time = time;
    }
}
