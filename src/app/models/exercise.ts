export class Exercise {
    id: string;
    name: string;
    desc: string;
    time: string;
    sets: number;

    constructor(name: string, desc: string, time: string, sets: number, id?: string) {
        this.id = id; // ?? Math.floor(Math.random() * 100) + Date.now().toString(); todo
        this.name = name;
        this.desc = desc;
        this.time = time;
        this.sets = sets;
    }
}
