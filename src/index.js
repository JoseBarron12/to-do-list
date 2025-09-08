import "./styles.css";
import { functionality } from "./functionality";
import { display } from "./display";

functionality.addMenuBtn();
functionality.addThemeBtn();

display.mainPage("today");

const addLabelWindow = document.querySelector(".add-labels");
console.log(addLabelWindow);
const closeLabelWindowBtn = document.querySelector(".exit-new-label");

functionality.addExitBtn(closeLabelWindowBtn, addLabelWindow);

const addTaskWindow = document.querySelector("dialog.add-task-window");
const closeTaskWindowBtn = document.querySelector(".exit-button");

functionality.addExitBtn(closeTaskWindowBtn, addTaskWindow);





