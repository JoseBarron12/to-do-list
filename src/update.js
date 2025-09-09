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

    const clearForm = (formToClear) => {
        const inputs = formToClear.querySelectorAll("input");
        if(inputs.length != 0)
        {
            inputs.forEach((input) => {
                clearValidFlag(input);
                input.value = "";
            });
        }
        const textArea = formToClear.querySelectorAll("textarea");
        if(textArea.length != 0)
        {
            textArea.forEach((input) => {
                clearValidFlag(input);
                input.value = "";
            });
        }
    }
    return {selectedFormLabels, clearValidFlag, userValid, userInvalid, clearForm};
})();