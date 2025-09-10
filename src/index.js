import "./styles.css";
import { functionality } from "./functionality";
import { display } from "./display";
import { allTasksOfUser } from "./default";

functionality.addMenuBtn();
functionality.addThemeBtn();

display.mainPage("today");

const addTaskBtn = document.querySelector("#addTask");
const addTaskWindow = document.querySelector(".add-task-window");

functionality.addOpenDialogWinBtn(addTaskBtn, addTaskWindow);


const testBtn = document.querySelector("header");

testBtn.addEventListener("click", () => {
    console.log("CURRENT ALL TASKS");
    console.log(allTasksOfUser.allCurrentTask);

    console.log("TODAY TASKS");
    console.log(allTasksOfUser.getTodayTasks());

    console.log("UPCOMING TASKS");
    console.log(allTasksOfUser.getUpcomingTasks());

    console.log("PAST TASKS");
    console.log(allTasksOfUser.getPastTasks());

});









