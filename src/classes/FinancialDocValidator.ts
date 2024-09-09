export class FinancialDocValidator {
    public static validate = (value: string | number): boolean => {
        if (typeof value === "number" && value < 0) {
            return false;
        }
        return !(typeof value === "string" && !value);
    }
}
