"use strict";
import { FinanceTypes, HtmlElements, Positions } from "./models";
import { Invoice, ListTemplate, Payment } from "./classes";
const getUiElement = (elementName) => document.querySelector(`#${elementName}`);
const getElementValue = (elementName, elementType) => {
    if (elementType === HtmlElements.Select)
        return document.querySelector(`#${elementName}`).value;
    if (elementType === HtmlElements.Input)
        return document.querySelector(`#${elementName}`).value;
    return "";
};
const getFormValue = () => {
    var _a;
    const typeValue = getElementValue("type", HtmlElements.Select);
    const toFromValue = getElementValue("toFrom", HtmlElements.Input);
    const detailsValue = getElementValue("details", HtmlElements.Input);
    const amountValue = parseFloat((_a = getElementValue("amount", HtmlElements.Input)) !== null && _a !== void 0 ? _a : "");
    return {
        typeValue, toFromValue, detailsValue, amountValue
    };
};
const getFinancialType = (formValues) => {
    let financialType;
    financialType = new Invoice(formValues.toFromValue, formValues.detailsValue, formValues.amountValue);
    if (formValues.typeValue.toUpperCase() === FinanceTypes.Payment.toUpperCase()) {
        financialType = new Payment({
            clientOrRecipient: formValues.toFromValue,
            jobDetail: formValues.detailsValue,
            jobAmount: formValues.amountValue
        });
    }
    return financialType;
};
let uiElement;
let servicesForm = document.querySelector("#services");
if (servicesForm) {
    servicesForm = servicesForm;
    uiElement = getUiElement("records");
    servicesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formValues = getFormValue();
        console.log(formValues);
        const listTemplate = new ListTemplate(uiElement);
        let financialType = getFinancialType(formValues);
        console.log(financialType);
        listTemplate.render({ item: financialType, heading: formValues.typeValue, position: Positions.Start });
        return false;
    });
}
