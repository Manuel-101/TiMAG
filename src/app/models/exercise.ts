export class Exercise {
    id: string;
    name: string;
    desc: string;
    time: string;
    sets: number;

    constructor(name: string, desc: string, time: string, sets: number) {
        this.name = name;
        this.desc = desc;
        this.time = time;
        this.sets = sets;
    }
}
