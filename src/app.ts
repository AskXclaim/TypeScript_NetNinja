"use strict";
import {HasFormatter} from "./interfaces";
import {FinanceTypes, HtmlElements, Positions} from "./models";
import {Invoice, ListTemplate, Payment} from "./classes";


type FormValues = {
    typeValue: string,
    toFromValue: string,
    detailsValue: string,
    amountValue: number
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
        const listTemplate = new ListTemplate(uiElement);
        let financialType = getFinancialType(formValues);
        console.log(financialType);
        listTemplate.render({item: financialType, heading: formValues.typeValue, position: Positions.Start});
        
        return false;
    });
}

