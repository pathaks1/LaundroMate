import {Machine} from "@/pages/api/Machine";

export class Dryer extends Machine {
    constructor(num: number) {
        super(num);
    }

    public type() {
        return "Dryer"
    }
}