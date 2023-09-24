export class Machine {
    private id: number;
    private endTime: Date = new Date()
    private inUse: boolean = false;

    constructor(num: number) {
        this.id = num
    }

    public getId() {
        return this.id;
    }

    public getTime() {
        return this.endTime;
    }

    public addTime() {
        this.endTime.setTime(this.endTime.getTime() + 30*60*1000);
    }

    public setTime(newTime: Date) {
        this.endTime = newTime;
    }

    public setTrue() {
        this.inUse = true;
    }

    public setFalse() {
        this.inUse = false;
    }
    public type() {
        return "Machine"
    }
}