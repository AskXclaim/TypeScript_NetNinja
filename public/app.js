"use strict";
import { FinanceTypes, HtmlElements, Positions } from "./models";
import { FinancialDocValidator, Invoice, ListTemplate, Payment } from "./classes";
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
const setFormErrors = (erroredItems) => {
    const invalidElements = [];
    for (const item of erroredItems) {
        let element = document.getElementById(`${item.name.replace("Value", "")}`);
        invalidElements.push(element.id);
        console.log(element);
        element.style.borderWidth = "thin";
        element.style.borderColor = "red";
    }
    return invalidElements;
};
const areEntriesValid = (formValues) => {
    let erroredItems = [];
    for (const key in formValues) {
        if (!FinancialDocValidator.validate(formValues[key])) {
            erroredItems.push({ name: key, isValid: false });
        }
    }
    let elementsName = [];
    if (erroredItems.length > 0) {
        console.log(erroredItems);
        elementsName = setFormErrors(erroredItems);
        return { isValid: false, elementsName };
    }
    return { isValid: true, elementsName };
};
const addEventToInputs = (validation) => {
    for (const elementName of validation.elementsName) {
        let element = document.getElementById(`${elementName}`);
        element.addEventListener("focus", (event) => {
            event.preventDefault();
            element.style.borderColor = "none";
            element.style.borderWidth = "0";
        });
    }
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
        const validation = areEntriesValid(formValues);
        if (!validation.isValid) {
            addEventToInputs(validation);
            return;
        }
        const listTemplate = new ListTemplate(uiElement);
        let financialType = getFinancialType(formValues);
        console.log(financialType);
        listTemplate.render({ item: financialType, heading: formValues.typeValue, position: Positions.Start });
        return false;
    });
}
