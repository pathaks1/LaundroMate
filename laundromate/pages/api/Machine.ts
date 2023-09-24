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

    public resetTime() {
        this.endTime = new Date();
    }

    public setTrue() {
        this.inUse = true;
    }

    public setFalse() {
        this.inUse = false;
    }

    public type() {
        return "Machine";
    }
}