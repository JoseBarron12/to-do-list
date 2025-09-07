import "./styles.css";
import { functionality } from "./functionality";
import { display } from "./display";
import { Task } from "./class";

functionality.addMenuBtn();
functionality.addThemeBtn();

display.mainPage("today");

const task = new Task("go for a walk", "ima go for a walk", "12:00pm", "today", "important");

console.log(task.getId());
console.log(task.taskName);
console.log(task.taskDescription);
console.log(task.taskDate);
console.log(task.taskTypes);
console.log(task.taskDescriptors);

task.taskName = "no walk";
task.taskDescription = "nvm boring";
task.taskDate = "6:00 am";

console.log(task.taskName);
console.log(task.taskDescription);
console.log(task.taskDate);






