export class FinancialDocValidator {
}
FinancialDocValidator.validate = (value) => {
    if (typeof value === "number" && value < 0) {
        return false;
    }
    return !(typeof value === "string" && !value);
};
