import {HasFormatter} from "../interfaces";
import {JobDetail} from "../models";

export class Payment implements HasFormatter {
    readonly recipient: string;
    private readonly detail: string;
    public amount: number;

// Todo allow varying currency types
    constructor(jobDetail: JobDetail) {
        this.recipient = jobDetail.clientOrRecipient;
        this.detail = jobDetail.jobDetail;
        this.amount = jobDetail.jobAmount;
    }

    format = (): string =>
        `${this.recipient} is owed £${this.amount} for ${this.detail}`;
}