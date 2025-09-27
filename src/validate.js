import { Project, Task } from "./class";
import { isToday, isFuture} from "date-fns";
import { update } from "./update";
import { allTasksOfUser, currentPage, allProjectsOfUser } from "./default";
import { display } from "./display";

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
    };

    const time = (time) => {
        if(time.value.length == 0)
        {
            return false;
        }
        else if(time.min == "" && time.max == "")
        {
            
            return true;
        }
        else {
            if(currentPage.header != "evening")
            {
                return (time.value >= time.min && time.value < time.max);
            }
            return (time.value >= time.min || time.value < time.max);
            
        }
    }
    
    const taskForm = (id) => {
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

        let labels = [];
        const labelOptions = form.querySelector(".label-inputs");
        
        if(labelOptions.children.length != 0)
        {
            const taskLabels = labelOptions.querySelectorAll('input[type="checkbox"]');
            taskLabels.forEach(label => {
                labels.push(label.name);
            });
        }

        const taskProject = form.querySelector("select");


        if(id == undefined)
        {
            const newTask = new Task(taskName.value, taskDesc.value, new Date(dateTime), setType(dateTime));
            newTask.labels = labels
            newTask.addProject(allProjectsOfUser.getProjectFromId(taskProject.value));
            allTasksOfUser.addTask(newTask);
        }
        else
        {
            if(taskProject.value != "")
            {
                allTasksOfUser.editTaskformID(id, taskName.value, taskDesc.value, new Date(dateTime), setType(dateTime), labels, [allProjectsOfUser.getProjectFromId(taskProject.value)]);
            }
            else
            {
                allTasksOfUser.editTaskformID(id, taskName.value, taskDesc.value, new Date(dateTime), setType(dateTime), labels, []);
            }
            
        }
        
        update.savedTasks();

        return true;
    };

    const projectForm = (id, refreshPageFlag) => {
        const form = document.querySelector("#add-label-form");
        let validForm = true;

        const projectName = form.querySelector('#name-list');
        update.clearValidFlag(projectName);
        
        if( ! isValid.name(projectName.value))
        {
            validForm = false
            update.userInvalid(projectName);
        }
        else
        {
            update.userValid(projectName);
        }

        const projectColor = form.querySelector('input[type="color"]');
        update.clearValidFlag(projectColor);

        if( ! isValid.name(projectColor.value))
        {
            validForm = false
            update.userInvalid(projectColor);
        }
        else
        {
            update.userValid(projectColor);
        }

        const projectIcon = form.querySelector('select');
        update.clearValidFlag(projectIcon);

        if( ! isValid.name(projectIcon.value))
        {
            validForm = false
            update.userInvalid(projectIcon);
        }
        else
        {
            update.userValid(projectIcon);
        }

        if(validForm == false)
        {
            return false;
        }

        const projectDesc = form.querySelector('textarea');

        const newProject = new Project(projectName.value, projectDesc.value, projectColor.value, projectIcon.value)

        if(id == undefined)
        {
            allProjectsOfUser.addProject(newProject);
            if(document.querySelector(".projects") != null)
            {
                display.displayProject(document.querySelector(".projects"), newProject);
            }
        }
        else
        {
            allProjectsOfUser.editProjectfromID(id, projectName.value, projectDesc.value, projectColor.value, projectIcon.value);
            console.log(allProjectsOfUser.getProjectFromId(id));
            
            if(refreshPageFlag == true)
            {
                update.refreshCurrentProjectPage(id);
            }   
            else
            {
                if(document.querySelector(".projects") != null)
                {
                    
                }
                display.displayProject(document.querySelector(".projects"), allProjectsOfUser.getProjectFromId(id));
            }
                   
            
        }

        update.savedProjects();

        return true;

    };

    return {name, taskForm, date, time, projectForm};
})();