import "./styles.css";
import { functionality } from "./functionality";
import { display } from "./display";
import { allTasksOfUser,allProjectsOfUser } from "./default";
import { AllTasks } from "./class";
import { constructFrom, differenceInSeconds } from "date-fns";
import { startOfToday } from "date-fns";

console.log(allTasksOfUser);
console.log(allProjectsOfUser);

functionality.addMenuBtn();
functionality.addThemeBtn();
display.displayNotification();

display.mainPage("today");

const addTaskBtn = document.querySelector("#addTask");
const addTaskWindow = document.querySelector(".add-task-window");

functionality.addOpenDialogWinBtn(addTaskBtn, addTaskWindow, true);

const addListBtn = document.querySelector("#addHeader");
functionality.addNewListBtn(addListBtn, true);


allTasksOfUser.allCurrentTask.forEach(a => {
    console.log(differenceInSeconds(a.date, startOfToday()));
});















