import { Task } from "./class";
import { isToday, isFuture} from "date-fns";

const setType = (date) => {
    if(isToday(date))
    {
        return "today";
    }
    else if(isFuture(date))
    {
        return "upcoming"
    }
    else
    {
        return "past";
    }
    
}

export const isValid = (function() {
    const name = (inputName) => {
        return (inputName.replace(/^\s+|\s+$/gm,'').length != 0) ? true : false;
    }

    const addTaskForm = () => {
        const form = document.querySelector("#add-task-form");
        
        const taskName = form.querySelector('input[id="task-name"]');
        if( ! isValid.name(taskName.value))
        {
            return false;
        }

        const taskDate = form.querySelector('input[id="task-date"]');
        const taskTime = form.querySelector('input[id="task-time"]');
        const dateTime = taskDate.value + 'T' + taskTime.value;
        
        const taskDesc = form.querySelector('textarea[id="task-desc"]');

        const newTask = new Task(taskName.value, taskDesc.value, new Date(dateTime), setType(dateTime));
        
        const labelOptions = form.querySelector(".label-inputs");

        if(labelOptions.children.length != 0)
        {
            const taskLabels = labelOptions.querySelectorAll('input[type="checkbox"]');
            taskLabels.forEach(label => {
                newTask.addLabel(label.name);
            });
        }
        
        console.log(newTask);

        return true;
    }
    return {name, addTaskForm};
})();