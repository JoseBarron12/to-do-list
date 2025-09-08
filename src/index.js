import "./styles.css";
import { functionality } from "./functionality";
import { display } from "./display";

functionality.addMenuBtn();
functionality.addThemeBtn();

display.mainPage("today");

const openLabelsWinBtn = document.querySelector(".open-labels");
functionality.addOpenLabelsWinBtn(openLabelsWinBtn);






