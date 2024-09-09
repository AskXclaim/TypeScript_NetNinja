import {HasFormatter} from "../interfaces_types";

export class Invoice implements HasFormatter {

    //Todo change to allow different currency types
    constructor(
        readonly client: string,
        private details: string,
        public amount: number) {
    }

    format = (): string =>
        `${this.client} owes £${this.amount} for ${this.details}`;

}