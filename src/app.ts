"use strict";

let servicesForm = document.querySelector("#services");

if (servicesForm) {
    servicesForm = servicesForm as HTMLFormElement;
    servicesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let type = document.querySelector("#type") as HTMLSelectElement;
        const typeValue = type.value;
        let toFrom = document.querySelector("#toFrom") as HTMLSelectElement;
        const toFromValue = toFrom.value;
        let details = document.querySelector("#details") as HTMLSelectElement;
        const detailsValue = details.value;
        let amount = document.querySelector("#amount") as HTMLSelectElement;
        const amountValue = amount.value;
        
        console.log(typeValue,toFromValue,detailsValue,amountValue);
    });
}
console.log(servicesForm);
