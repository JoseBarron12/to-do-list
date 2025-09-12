import "./styles.css";
import { functionality } from "./functionality";
import { display } from "./display";
import { allTasksOfUser } from "./default";


console.log(allTasksOfUser);

functionality.addMenuBtn();
functionality.addThemeBtn();

display.mainPage("today");

const addTaskBtn = document.querySelector("#addTask");
const addTaskWindow = document.querySelector(".add-task-window");

functionality.addOpenDialogWinBtn(addTaskBtn, addTaskWindow, true);











