export class Payment {
    // Todo allow varying currency types
    constructor(jobDetail) {
        this.format = () => `${this.recipient} is owed £${this.amount} for ${this.detail}`;
        this.recipient = jobDetail.clientOrRecipient;
        this.detail = jobDetail.jobDetail;
        this.amount = jobDetail.jobAmount;
    }
}
