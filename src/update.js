import { defaultLabels } from "./default";
import { display } from "./display";

export const update = (function () {
    const selectedFormLabels = () => {
        const labelFormInput = document.querySelector(".label-inputs");
        labelFormInput.replaceChildren();
        defaultLabels.currLabels.forEach(label => {
            display.labels(labelFormInput, label);
        });
    };

    const clearValidFlag = (elementToClear) => {
        elementToClear.classList.remove("user-invalid");
        elementToClear.classList.remove("user-valid");
    };

    const userInvalid = (invalidElement) => {
        invalidElement.classList.add("user-invalid");
    };

    const userValid = (validElement) => {
        validElement.classList.add("user-valid");
    };
    return {selectedFormLabels, clearValidFlag, userValid, userInvalid};
})();