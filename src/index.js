import "./styles.css";
import { functionality } from "./functionality";
import { display } from "./display";
import { Task } from "./class";

functionality.addMenuBtn();
functionality.addThemeBtn();

display.mainPage("today");

const task = new Task("go for a walk", "ima go for a walk", "12:00pm", "today", "important");

console.log(task.getId());
console.log(task.name);
console.log(task.desc);
console.log(task.date);
console.log(task.type);
console.log(task.taskLabels);

task.name = "no walk";
task.desc = "nvm boring";
task.date = "6:00 am";
task.type = "upcoming";

console.log(task.name);
console.log(task.desc);
console.log(task.date);
console.log(task.type);







