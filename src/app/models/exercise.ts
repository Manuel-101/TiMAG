export class Exercise {
    id: string;
    name: string;
    desc: string;
    time: string;

    constructor(name: string, desc: string, time: string, id?: string) {
        this.id = id ?? Math.floor(Math.random() * 100) + Date.now().toString();

        this.name = name;
        this.desc = desc;
        this.time = time;
    }
}
