export class Invoice {
    //Todo change to allow different currency types
    constructor(client, details, amount) {
        this.client = client;
        this.details = details;
        this.amount = amount;
        this.format = () => `${this.client} owes £${this.amount} for ${this.details}`;
    }
}
