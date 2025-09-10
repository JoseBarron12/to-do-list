import { Task } from "./class";
import { isToday, isFuture} from "date-fns";
import { update } from "./update";
import { allTasksOfUser } from "./default";

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

    const date = (date) => {
        return (date.length != 0);
    }

    const addTaskForm = () => {
        const form = document.querySelector("#add-task-form");
        let validForm = true;
        const taskName = form.querySelector('input[id="task-name"]');
        update.clearValidFlag(taskName);
        
        if( ! isValid.name(taskName.value))
        {
            validForm = false
            update.userInvalid(taskName);
        }
        else
        {
            update.userValid(taskName);
        }
        
        const taskDate = form.querySelector('input[id="task-date"]');
        update.clearValidFlag(taskDate);

        if(! isValid.date(taskDate.value)) 
        {
            validForm = false
            update.userInvalid(taskDate);
        }
        else
        {
            update.userValid(taskDate);
        }
        
        const taskTime = form.querySelector('input[id="task-time"]');
        update.clearValidFlag(taskTime);

        if(! isValid.date(taskTime.value)) 
        {
            validForm = false
            update.userInvalid(taskTime);
        }
        else
        {
            update.userValid(taskTime);
        }
        if(validForm == false)
        {
            return false;
        }

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
        
        allTasksOfUser.addTask(newTask);

        return true;
    }
    return {name, addTaskForm, date};
})();