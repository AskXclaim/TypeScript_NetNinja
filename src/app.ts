"use strict";
import {FormValues, HasFormatter} from "./interfaces_types";
import {FinanceTypes, HtmlElements, Positions} from "./models";
import {FinancialDocValidator, Invoice, ListTemplate, Payment} from "./classes";

type ErroredItem = {
    name: string,
    isValid: boolean
};
type formValidation = {
    isValid: boolean,
    elementsName: string[]
}
const getUiElement = (elementName: string): HTMLUListElement =>
    document.querySelector(`#${elementName}`) as HTMLUListElement;
const getElementValue = (elementName: string, elementType: HtmlElements): string => {

    if (elementType === HtmlElements.Select)
        return (document.querySelector(`#${elementName}`) as HTMLSelectElement).value;

    if (elementType === HtmlElements.Input)
        return (document.querySelector(`#${elementName}`) as HTMLInputElement).value;

    return "";
}
const getFormValue = (): FormValues => {
    const typeValue = getElementValue("type", HtmlElements.Select);
    const toFromValue = getElementValue("toFrom", HtmlElements.Input);
    const detailsValue = getElementValue("details", HtmlElements.Input);
    const amountValue = parseFloat(getElementValue("amount", HtmlElements.Input) ?? "");
    return {
        typeValue, toFromValue, detailsValue, amountValue
    }
}

const setFormErrors = (erroredItems: ErroredItem[]): string[] => {
    const invalidElements: string[] = [];
    for (const item of erroredItems) {
        let element: HTMLInputElement = document.getElementById
        (`${item.name.replace("Value", "")}`) as HTMLInputElement;
        invalidElements.push(element.id);
        console.log(element);
        element.style.borderWidth = "thin";
        element.style.borderColor = "red";
    }
    return invalidElements;
}

const areEntriesValid = (formValues: FormValues): formValidation => {
    let erroredItems: ErroredItem[] = [];

    for (const key in formValues) {
        if (!FinancialDocValidator.validate(formValues[key as keyof FormValues])) {
            erroredItems.push({name: key, isValid: false});
        }
    }
    let elementsName: string[] = [];
    if (erroredItems.length > 0) {
        console.log(erroredItems);
        elementsName = setFormErrors(erroredItems);
        return {isValid: false, elementsName};
    }
    return {isValid: true, elementsName};
}

const addEventToInputs = (validation:formValidation) => {
    for (const elementName of validation.elementsName) {
        let element = document.getElementById(`${elementName}`) as HTMLInputElement;
        element.addEventListener("focus", (event: Event) => {
            event.preventDefault();
            element.style.borderColor = "none";
            element.style.borderWidth = "0";
        });
    }
}
const getFinancialType = (formValues: FormValues) => {
    let financialType: HasFormatter;
    financialType = new Invoice(formValues.toFromValue, formValues.detailsValue, formValues.amountValue);

    if (formValues.typeValue.toUpperCase() === FinanceTypes.Payment.toUpperCase()) {
        financialType = new Payment({
            clientOrRecipient: formValues.toFromValue,
            jobDetail: formValues.detailsValue,
            jobAmount: formValues.amountValue
        });
    }
    return financialType;
}


let uiElement: HTMLUListElement;
let servicesForm = document.querySelector("#services");

if (servicesForm) {
    servicesForm = servicesForm as HTMLFormElement;
    uiElement = getUiElement("records");

    servicesForm.addEventListener("submit", (event:Event) => {
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
        listTemplate.render({item: financialType, heading: formValues.typeValue, position: Positions.Start});
        
        return false;
    });
}

