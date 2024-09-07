"use strict";
let servicesForm = document.querySelector("#services");
if (servicesForm) {
    servicesForm = servicesForm;
    servicesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let type = document.querySelector("#type");
        const typeValue = type.value;
        let toFrom = document.querySelector("#toFrom");
        const toFromValue = toFrom.value;
        let details = document.querySelector("#details");
        const detailsValue = details.value;
        let amount = document.querySelector("#amount");
        const amountValue = amount.value;
        console.log(typeValue, toFromValue, detailsValue, amountValue);
    });
}
console.log(servicesForm);
