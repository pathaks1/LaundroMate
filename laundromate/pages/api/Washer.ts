import {Machine} from "@/pages/api/Machine";

export class Washer extends Machine {
    constructor(num: number) {
        super(num);
    }

    public type() {
        return "Washer"
    }
}