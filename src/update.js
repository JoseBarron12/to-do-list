import { allTasksOfUser, currentPage, defaultLabels, allProjectsOfUser } from "./default";
import { display } from "./display";
import { AllTasks, Task, AllProjects, Project} from "./class";
import { constructFrom } from "date-fns";
import { constructFromSymbol } from "date-fns/constants";

export const update = (function () {
    
    const selectedFormLabels = () => {
        const labelFormInput = document.querySelector(".label-inputs");
        labelFormInput.replaceChildren();
        defaultLabels.currLabels.forEach(label => {
            display.labels(labelFormInput, label);
        });
    };

    const clearFormLabels = () => {
        defaultLabels.deleteAllCurrLabels();
    };

    const clearValidFlag = (elementToClear) => {
        elementToClear.classList.remove("user-invalid");
        elementToClear.classList.remove("user-valid");
    };

    const userInvalid = (invalidElement) => {
        invalidElement.classList.add("user-invalid");
    };

    const userValid = (validElement) => {
        validElement.classList.add("user-valid");
    };

    const clearForm = (formToClear) => {
        const inputs = formToClear.querySelectorAll("input");
        if(inputs.length != 0)
        {
            inputs.forEach((input) => {
                clearValidFlag(input);
                input.value = "";
            });
        }
        const textArea = formToClear.querySelectorAll("textarea");
        if(textArea.length != 0)
        {
            textArea.forEach((input) => {
                clearValidFlag(input);
                input.value = "";
            });
        }

        const select = formToClear.querySelectorAll("select");
        if(select.length != 0)
        {
            select.forEach((input) => {
                clearValidFlag(input);
                input.value = "";
            });
        }

        const resetIcons = formToClear.querySelectorAll(".reset-icon");
        if(resetIcons != 0)
        {
            resetIcons.forEach((icon) => {
                icon.remove();
            });
        }

        const inputIcon = formToClear.querySelector(".input-icon");
        if(inputIcon != null)
        {
            inputIcon.remove();
        };
    };

    const savedTasks = () => {
        const currentTasks = JSON.stringify(allTasksOfUser.allCurrentTask);
        localStorage.setItem("userTasks", currentTasks);
    };

    const savedProjects = () => {
        const currentProjects = JSON.stringify(allProjectsOfUser.allCurrentProjects);
        localStorage.setItem("userProjects", currentProjects);
    }

    const currentUserTasks = () => {
        const savedTasksData = localStorage.getItem("userTasks");
        const userTasks = new AllTasks();
        if( savedTasksData != null)
        {
            const dataObjs = JSON.parse(localStorage.getItem("userTasks"));
            for (const dataObj of dataObjs)
            {
                const name = dataObj._name;
                const desc = dataObj._desc;
                const type = dataObj._type;
                const date = new Date(dataObj._date);
                const task = new Task(name, desc, date, type);
                
                task.setId(dataObj._id);
                task.labels = dataObj.taskLabels;

                const projects = dataObj.taskProjects;
                for(const project of projects)
                {
                    const projectName = project._name;
                    const projectDesc  = project._desc;
                    const projectColor = project._color;
                    const projectIcon = project._icon;
                    const projectId = project._id;

                    const newProject = new Project(projectName, projectDesc, projectColor, projectIcon);
                    newProject.setId(projectId);

                    task.addProject(newProject);
                }

                userTasks.addTask(task);
            }
            return userTasks;
        }
        return userTasks;
    };

    const currentUserProjects = () => {
        const savedProjectsData = localStorage.getItem("userProjects");
        const userProjects = new AllProjects();
        if(savedProjectsData != null)
        {
            console.log("Saved and shit");
            const dataObjs = JSON.parse(localStorage.getItem("userProjects"));
            for (const dataObj of dataObjs) 
            {
                const name = dataObj._name;
                const desc = dataObj._desc;
                const color = dataObj._color;
                const icon = dataObj._icon;

                const project = new Project(name, desc, color, icon);
                project.setId(dataObj._id);

                userProjects.addProject(project);
            }
            return userProjects;
        }
        return userProjects;
    }

    const clearCurrentPage = () => {
        const content = document.querySelector("#content");
        content.replaceChildren();
    };

    const refreshCurrentPage = () => {
        clearCurrentPage();
        display.mainPage(currentPage.page);
    };

    const refreshCurrentProjectPage = (id) => {
        clearCurrentPage();
        display.listPage(id);
    };


    const clearTasks = (parent) => {
        parent.replaceChildren();
    };

    const refreshTasksFromType = (parent, type, currentArray) => {
        switch (type) {
            case "all":
                refreshCurrentPage();
                return;
            case "today":
                clearTasks(parent);
                display.allHeader(type);
                display.displayTasks(parent, AllTasks.getTdyTasks(currentArray));
                return;
            case "upcoming":
                clearTasks(parent);
                display.allHeader(type);
                display.displayTasks(parent, AllTasks.getFutureTasks(currentArray));
                return;
            case "past":
                clearTasks(parent);
                display.allHeader(type);
                display.displayTasks(parent, AllTasks.getPastTasks(currentArray));
                return;
        }
    };

    const refreshTasksFromTypeProject = (parent, type, currentArray, id) => {
        switch (type) {
            case "all":
                refreshCurrentProjectPage(id);
                return;
            case "today":
                clearTasks(parent);
                display.allHeader(type);
                display.displayTasks(parent, AllTasks.getTdyTasks(currentArray));
                return;
            case "upcoming":
                clearTasks(parent);
                display.allHeader(type);
                display.displayTasks(parent, AllTasks.getFutureTasks(currentArray));
                return;
            case "past":
                clearTasks(parent);
                display.allHeader(type);
                display.displayTasks(parent, AllTasks.getPastTasks(currentArray));
                return;
        }
    };



    const inputMinMax = (parent) => {
        const dateInput = parent.querySelector('input[type="date"]');
        const dateMin = AllTasks.getDateMin(currentPage.page);
        const dateMax = AllTasks.getDateMax(currentPage.page);
        dateInput.setAttribute("min", dateMin);
        dateInput.setAttribute("max", dateMax);

        if(currentPage.page == "today" )
        {
            const timeInput = parent.querySelector('input[type="time"]');
            const timeMin = AllTasks.getTimeMin(currentPage.header);
            const timeMax = AllTasks.getTimeMax(currentPage.header);
            timeInput.setAttribute("min", timeMin);
            timeInput.setAttribute("max", timeMax);
        }
        
        
    };

    const refreshSectionHeader = (parent, headerName, iconOn) => {
        parent.replaceChildren();
        display.displaySectionHeader(parent, headerName, iconOn, currentPage.page);
    };

    const currTasksOnPge = () => {
        const parent = document.querySelector(".tasks-section");
        const iconOn = (currentPage.page == "today") ? true : false;
        const headerName = currentPage.header;
        if(headerName != "all")
        {
            update.refreshSectionHeader(parent,headerName,iconOn);
        }
        else {
            update.refreshCurrentPage();
        }
    };

    const clearAllNavBtns = () => {
        const navButtons = document.querySelectorAll(".sidebar-options>button");
            navButtons.forEach((btns) => {
                btns.classList.remove("active-btn");
            });

        const projectBtns = document.querySelectorAll(".project");
        projectBtns.forEach((btns) => {
            btns.classList.remove("active-btn");
        });
    }

    return {selectedFormLabels, clearValidFlag, userValid, userInvalid, clearForm, clearFormLabels, savedTasks, currentUserTasks, clearCurrentPage, refreshCurrentPage,refreshTasksFromType, inputMinMax,refreshSectionHeader, currTasksOnPge, currentUserProjects, savedProjects, clearAllNavBtns, refreshTasksFromTypeProject, refreshCurrentProjectPage};
})();