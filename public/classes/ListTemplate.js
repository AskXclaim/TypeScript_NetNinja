import { Positions } from "../models";
export class ListTemplate {
    constructor(ulElement) {
        this.ulElement = ulElement;
        this.render = (listDetail) => {
            const li = document.createElement("li");
            const div = this.getDiv(listDetail.item, listDetail.heading);
            li.append(div);
            li.style.borderStyle = "solid";
            li.style.borderColor = "Indigo";
            li.style.borderWidth = "thin";
            li.style.marginBottom = "10px";
            li.style.padding = "10px";
            if (listDetail.position === Positions.Start) {
                this.ulElement.prepend(li);
            }
            if (listDetail.position === Positions.End) {
                this.ulElement.append(li);
            }
        };
        this.getH4 = (heading) => {
            const h4 = document.createElement("h4");
            h4.style.display = "inline-block";
            h4.style.fontWeight = "bold";
            h4.style.marginRight = "10px";
            h4.innerText = `${heading}:`;
            return h4;
        };
        this.getDiv = (item, heading) => {
            const div = document.createElement("div");
            const span = document.createElement("span");
            span.innerHTML = item.format();
            const h4 = this.getH4(heading);
            div.append(h4);
            div.append(span);
            return div;
        };
    }
}
