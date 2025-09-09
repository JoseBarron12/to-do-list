import { defaultLabels } from "./default";
import { display } from "./display";

export const update = (function () {
    const selectedFormLabels = () => {
        const labelFormInput = document.querySelector(".label-inputs");
        labelFormInput.replaceChildren();
        defaultLabels.currLabels.forEach(label => {
            display.labels(labelFormInput, label);
        });
    }
    return {selectedFormLabels};
})();