import listImage from "./images/list.svg";
import { images, buttonTypes, page, nameFlags, currentPage, defaultLabels, allTasksOfUser, projectIcons, allProjectsOfUser} from "./default";
import { functionality } from "./functionality";
import { format, sub } from "date-fns";
import { update } from "./update";
import { AllTasks } from "./class";

const toUpperCaseFirstChar = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const displayMainPageHeader = (parent, headerName) => {
        const pageHeader = document.createElement("div");
        pageHeader.classList.add("content-header");
        parent.appendChild(pageHeader);

        const contentImage = document.createElement("img");
        contentImage.src = images[headerName];
        contentImage.alt = `${headerName}-icon`;
        contentImage.classList.add("header-icon");
        pageHeader.appendChild(contentImage);

        const contentHeader = document.createElement("h3");
        contentHeader.textContent = toUpperCaseFirstChar(headerName);
        pageHeader.appendChild(contentHeader);
};

const displaySectionHeaders = (parent, headerNames, iconOn, pageName) => {
    headerNames.forEach((headerName) => {

        const section = document.createElement("div");
        section.classList.add(`${headerName}`);
        parent.appendChild(section);

        const sectionHeader = document.createElement("div");
        sectionHeader.classList.add("task-section-header");
        section.appendChild(sectionHeader);

        if(headerName != "all" || pageName == "all")
        {
            if(iconOn)
            {
                const sectionHeaderImg = document.createElement("img");
                sectionHeaderImg.src = images[headerName];
                sectionHeaderImg.alt = `${headerName}-icon`;
                sectionHeaderImg.classList.add("emoji-icon");
                sectionHeader.appendChild(sectionHeaderImg);
            }
            
            const header = document.createElement("h5");
            const strBfr = (pageName == "past") ? "Last " : "This ";
            const headerCurrentName = toUpperCaseFirstChar(headerName);
            const headerText = (displayStringBefore(headerCurrentName)) ?  strBfr + headerCurrentName : headerCurrentName;
            header.textContent = headerText;
            sectionHeader.appendChild(header);
        }
        else
        {
            sectionHeader.classList.add("border-off");
        }

        display.dropDownMenu(sectionHeader, true);

        const tasks = document.createElement("div");
        tasks.classList.add("tasks");
        section.appendChild(tasks);

        const tasksInHdr = AllTasks.getTaskFromHdrName(allTasksOfUser.getTasksFromName(pageName), headerName);
        display.displayTasks(tasks, tasksInHdr);

    });
};

const displaySectionBtns = (parent, pageName) => {
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("content-btns");
    parent.appendChild(btnDiv);

    if(pageName != "all") {
        const allBtn = document.createElement("button");
        allBtn.textContent = "All";
        allBtn.classList.add("all");
        allBtn.setAttribute("id", "active-btn");
        btnDiv.appendChild(allBtn);
        
        page[pageName].forEach((btn) => {
            const contentbtn = document.createElement("button");
            const strBfr = (pageName == "past") ? "Last " : "This ";
            contentbtn.textContent = (displayStringBefore(toUpperCaseFirstChar(btn))) ?  strBfr + toUpperCaseFirstChar(btn) : toUpperCaseFirstChar(btn);
            contentbtn.classList.add(`${btn}`);
            btnDiv.appendChild(contentbtn);
        });
    }
    else {
        buttonTypes.forEach((btn) => {
            const contentbtn = document.createElement("button");
            contentbtn.textContent = toUpperCaseFirstChar(btn);
            contentbtn.classList.add(`${btn}`);
            if(btn == "all")
            {
                contentbtn.setAttribute("id", "active-btn");
            }
            btnDiv.appendChild(contentbtn);
        });
    }
};

// Function to flag whether string should have a string beforehand
const displayStringBefore = (string) => {
    for(const nameFlag of nameFlags)
    {
        if(nameFlag == string)
        {
            return false;
        }
    }
    return true;
};

const displaySVG = ({ className, viewBox, pathD, titleText }) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", viewBox);
    if (className) svg.classList.add(...className.split(" "));

    // Add <title> for accessibility
    if (titleText) {
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = titleText;
        svg.appendChild(title);
    }

    // Add <path>
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    svg.appendChild(path);

    return svg;
};

export const display = (function () {
    const navbar = () => {
        const main = document.querySelector("main");
        const mainContent = document.querySelector(".main-content");

        const navbar = document.createElement("div");
        navbar.classList.add("sidebar");
        main.insertBefore(navbar,mainContent);

        const nav = document.createElement("nav");
        navbar.appendChild(nav);

        const sidebarOptions = document.createElement("div");
        sidebarOptions.classList.add("sidebar-options");
        nav.appendChild(sidebarOptions);

        buttonTypes.forEach((buttonType) => {
            const button = document.createElement("button");
            button.setAttribute("id", buttonType)
            if(currentPage.page == buttonType)
            {
                button.classList.add("active-btn");
            }
            sidebarOptions.appendChild(button);

            const buttonImg = document.createElement("img");
            buttonImg.src = images[buttonType];
            buttonImg.alt = `${buttonType}-icon`;
            buttonImg.classList.add("icon");
            button.appendChild(buttonImg);

            const buttonHeader = document.createElement("h5");
            buttonHeader.textContent = toUpperCaseFirstChar(buttonType);
            button.appendChild(buttonHeader);

            const numOfTasks = document.createElement("div");
            numOfTasks.classList.add("num-tasks");
            button.appendChild(numOfTasks);

            const numofTtlTasks = allTasksOfUser.getTasksFromName(buttonType).length;
            const numOfImpTasks = AllTasks.getNumOfImportantTasks(allTasksOfUser.getTasksFromName(buttonType));

            if(numOfImpTasks != 0)
            {
                const impTasks = document.createElement("div");
                impTasks.classList.add("num-imp");
                impTasks.textContent = numOfImpTasks;
                numOfTasks.appendChild(impTasks);
            }

            const ttlTasks = document.createElement("div");
            ttlTasks.classList.add("num-ttl");
            ttlTasks.textContent = numofTtlTasks;
            numOfTasks.appendChild(ttlTasks);
        });

        const userList = document.createElement("button");
        nav.appendChild(userList);
        
        const userListImage = document.createElement("img");
        userListImage.src = listImage;
        userListImage.alt = "User list icon";
        userListImage.classList.add("icon");
        userList.appendChild(userListImage);

        const userListHeader = document.createElement("h5");
        userListHeader.textContent = "My Lists";
        userList.appendChild(userListHeader);

        const addNewListSVG = displaySVG({
            className: "add-new-list",
            viewBox: "0 0 24 24",
            pathD: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
            titleText: "plus"
        });

        userList.appendChild(addNewListSVG);

        const projects = document.createElement("div");
        projects.classList.add("projects");
        navbar.appendChild(projects);

        for(const project of allProjectsOfUser.allCurrentProjects)
        {
            displayProject(projects, project);
        }

        const sidebarSettings = document.createElement("div");
        sidebarSettings.classList.add("sidebar-settings");
        navbar.appendChild(sidebarSettings);

        const addSection =  document.createElement("div");
        addSection.classList.add("add");
        sidebarSettings.appendChild(addSection);

        // Plus Icon svg
        const svgNSPlus = "http://www.w3.org/2000/svg";
        
        const svgPlus = document.createElementNS(svgNSPlus, "svg");
        svgPlus.setAttribute("class", "icon add");
        svgPlus.setAttribute("xmlns", svgNSPlus);
        svgPlus.setAttribute("viewBox", "0 0 24 24");
        
        const titlePlus = document.createElementNS(svgNSPlus, "title");
        titlePlus.textContent = "plus";
        svgPlus.appendChild(titlePlus);
        
        const pathPlus = document.createElementNS(svgNSPlus, "path");
        pathPlus.setAttribute("d", "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z");
        svgPlus.appendChild(pathPlus);
        
        addSection.appendChild(svgPlus);

        const addSectionHeader = document.createElement("h5");
        addSectionHeader.textContent = "New list";
        addSection.appendChild(addSectionHeader);

        const settingSection = document.createElement("div");
        settingSection.classList.add("setting");
        sidebarSettings.appendChild(settingSection);

        
        // Setting icon svg
        const svgNS = "http://www.w3.org/2000/svg";

        const svgSetting = document.createElementNS(svgNS, "svg");
        svgSetting.setAttribute("class", "icon navbar-setting");
        svgSetting.setAttribute("xmlns", svgNS);
        svgSetting.setAttribute("viewBox", "0 0 24 24");

        const titleSetting = document.createElementNS(svgNS, "title");
        titleSetting.textContent = "tune";
        svgSetting.appendChild(titleSetting);

        const pathSetting = document.createElementNS(svgNS, "path");
        pathSetting.setAttribute(
        "d",
        "M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"
        );
        svgSetting.appendChild(pathSetting);

        settingSection.appendChild(svgSetting);
        
        functionality.addNewListBtn(addNewListSVG,true);
        functionality.addNewListBtn(svgPlus, true);
        functionality.editProjectIcons(svgSetting, navbar);

        functionality.addNavbarBtn();

    };
    const menuButtonSection = (navbarOpened) => {
        const menuTab = document.querySelector(".menu-tab");
        menuTab.style.backgroundColor = (navbarOpened) ? "var(--secondary)" : "var(--primary)";
    };
    const dropDownMenu = (parent, isOpen) => {
        const dropDownMenuDiv = document.createElement("div");
        dropDownMenuDiv.classList.add("dropdown-menu");
        
        if(isOpen) {
            dropDownMenuDiv.classList.add("open");
        }

        parent.appendChild(dropDownMenuDiv);

        const menuDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        menuDown.setAttribute("class", "icon down");
        menuDown.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        menuDown.setAttribute("viewBox", "0 0 24 24");

        const titleDown = document.createElementNS("http://www.w3.org/2000/svg", "title");
        titleDown.textContent = "menu-down";

        const pathDown = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathDown.setAttribute("d", "M7,10L12,15L17,10H7Z");

        menuDown.appendChild(titleDown);
        menuDown.appendChild(pathDown);
        dropDownMenuDiv.appendChild(menuDown);

        // Create "menu-up" SVG
        const menuUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        menuUp.setAttribute("class", "icon up");
        menuUp.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        menuUp.setAttribute("viewBox", "0 0 24 24");

        const titleUp = document.createElementNS("http://www.w3.org/2000/svg", "title");
        titleUp.textContent = "menu-up";

        const pathUp = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathUp.setAttribute("d", "M7,15L12,10L17,15H7Z");

        menuUp.appendChild(titleUp);
        menuUp.appendChild(pathUp);
        dropDownMenuDiv.appendChild(menuUp);

    };

    const dialogWindowText = (parent, isAddTaskWin, id) => {
        const header = parent.querySelector("h3");
        const button = parent.querySelector("button.submit-button");
        
        let textForHeader = " ";
        
        if( currentPage.header != "all")
        {
            textForHeader = ` ${currentPage.header} `;
        }

        if(isAddTaskWin)
        {
            header.textContent = `Create Task`;
            button.textContent = "Create";
        }
        else
        {
            header.textContent = `Edit Task`;
            button.textContent = "Confirm";
            
            update.inputMinMax(parent);

            const currTask = allTasksOfUser.getTaskFromId(id);

            const form = parent.querySelector("form");
            const taskName = form.querySelector('input[id="task-name"]');
            const taskDate = form.querySelector('input[id="task-date"]');
            const taskTime = form.querySelector('input[id="task-time"]');
            const taskDesc = form.querySelector('textarea[id="task-desc"]');

            taskName.value = currTask.name;
            
            const labelOptions = form.querySelector(".label-inputs");

            const currLabels = currTask.labels;
            currLabels.forEach((label) => {
                labels(labelOptions, label);
            });

            taskDate.value = format(currTask.date, "yyyy-MM-dd");
            taskTime.value = format(currTask.date, "HH:mm");

            taskDesc.value = currTask.desc;
        }
    };

    const projectWinText = (parent, isAddProjectWin, id) => {
        const header = parent.querySelector("form>h3");
        const button = parent.querySelector("button.submit-list-btn");
        
        let textForHeader = " ";
        
        if( currentPage.header != "all")
        {
            textForHeader = ` ${currentPage.header} `;
        }

        if(isAddProjectWin)
        {
            header.textContent = `Create List`;
            button.textContent = "Create";
        }
        else
        {
            header.textContent = `Edit List`;
            button.textContent = "Confirm";
            
            const currProject = allProjectsOfUser.getProjectFromId(id);

            const form = parent.querySelector("form");

            const projectName = form.querySelector('input[type="text"]');
            projectName.value = currProject.name;
            
            const projectColor = form.querySelector('input[type="color"]');
            projectColor.value = currProject.color;

            const projectIcon = form.querySelector('select');
            projectIcon.value = currProject.icon;

            const projectDesc = form.querySelector('textarea');
            projectDesc.value = currProject.desc;
        }
    }

    const mainPage = (name) => {
        const content = document.querySelector("#content");

        const mainPage = document.createElement("div");
        mainPage.classList.add("page");
        content.appendChild(mainPage);

        displayMainPageHeader(mainPage, name);
        displaySectionBtns(mainPage,name);

        const tasksSection = document.createElement("div");
        tasksSection.classList.add("tasks-section");
        mainPage.appendChild(tasksSection);

        displaySectionHeader(tasksSection, "all", (name == "today") ? true: false, name);

        const tasks = document.querySelector(".tasks");
        
        if(name == "all")
        {
            functionality.updateTaskDisplayBtn(mainPage.querySelectorAll("div.content-btns>button"), tasks, allTasksOfUser.getTasksFromName(name));
        }
        else {
            functionality.updateHeaderDisplayBtn(mainPage.querySelectorAll("div.content-btns>button"), tasksSection)
        }
        
    };

    const addLabelsWindow = () => {
        const taskLabels = document.querySelector("#task-labels");
        
        const addLabelWindowFlag = document.querySelector(".add-labels");
        if(addLabelWindowFlag != null)
        {
            return;
        }

        const addLabelWindow = document.createElement("div");
        
        addLabelWindow.classList.add("add-labels");
        taskLabels.appendChild(addLabelWindow);

        const windowHeader = document.createElement("div");
        windowHeader.classList.add("add-labels-header");
        addLabelWindow.appendChild(windowHeader);

        const labelHeader = document.createElement("h5");
        labelHeader.textContent = "Add Label";
        windowHeader.appendChild(labelHeader);

        const addNewLabelSVG = displaySVG({
            className: "add-new-label",
            viewBox: "0 0 24 24",
            pathD: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
            titleText: "plus"
        });

        const exitNewLabelSVG = displaySVG({
            className: "exit-new-label",
            viewBox: "0 0 24 24",
            pathD: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
            titleText: "close"
        });

        windowHeader.appendChild(addNewLabelSVG);
        windowHeader.appendChild(exitNewLabelSVG);

        const labelOptions = document.createElement("div");
        labelOptions.classList.add("label-options");
        addLabelWindow.appendChild(labelOptions);

        defaultLabels.defLabels.forEach((label) => {
            const labelOption = document.createElement("label");
            labelOption.classList.add("label");
            labelOption.setAttribute("for", `label-${label}`)
            labelOptions.appendChild(labelOption);

            const input = document.createElement("input");
            input.classList.add("window");
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", `${label}`);
            input.setAttribute("id", `label-${label}`);
            if(defaultLabels.isCurrentLabel(label))
            {
                input.checked = true;
            }
            labelOption.appendChild(input);

            const checkBoxLabel = document.createElement("div");
            checkBoxLabel.classList.add("label-checkbox");
            labelOption.appendChild(checkBoxLabel);

            const checkBoxText = document.createElement("div");
            checkBoxText.textContent = toUpperCaseFirstChar(label);
            checkBoxLabel.appendChild(checkBoxText);
        });

        const closeLabelWindowBtn = addLabelWindow.querySelector(".exit-new-label");

        functionality.closeAddLabelWin(addLabelWindow);
        functionality.addExitBtn(closeLabelWindowBtn, addLabelWindow);
        functionality.addLabelBtns();
    };

    const labels = (parent,labelName) => {
        
        const LabelFlag = parent.querySelector(`.label>input[id=${labelName}]`);
        if(LabelFlag != null)
        {
            return;
        }

        const labelDiv = document.createElement("div");
        labelDiv.classList.add("label");
        parent.appendChild(labelDiv);

        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", `${labelName}`);
        input.setAttribute("id", `${labelName}`);
        input.checked = true;
        labelDiv.appendChild(input);

        const checkBoxLabel = document.createElement("div");
        checkBoxLabel.classList.add("label-checkbox");
        labelDiv.appendChild(checkBoxLabel);

        const checkBoxText = document.createElement("div");
        checkBoxText.textContent = toUpperCaseFirstChar(labelName);
        checkBoxLabel.appendChild(checkBoxText);

        const closeSVG = displaySVG({
        className: "",
        viewBox: "0 0 24 24",
        pathD: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
        titleText: "close"
        });

        checkBoxLabel.appendChild(closeSVG);

        functionality.addDeleteLabelBtn(closeSVG, labelDiv, labelName);

    };

    const textClearBtn = (inputBox) => {
        const isIconDisplayed = inputBox.querySelector("svg");

        if(isIconDisplayed == null)
        {
            const closeIcon = displaySVG({
            className: "input-icon",
            viewBox: "0 0 24 24",
            pathD: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
            titleText: "close"
            });
            inputBox.appendChild(closeIcon);
            functionality.addClearTextBtn(closeIcon,inputBox);
        }
        
    };

    const inputClearBtn = (inputBox) => {
        const isIconDisplayed = inputBox.querySelector("svg");

        if(isIconDisplayed == null) {
            const resetIcon = displaySVG({
            className: "reset-icon",
            viewBox: "0 0 24 24",
            pathD: "M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z",
            titleText: "restart"
            });

            const header = inputBox.querySelector(".task-wrapper");
            header.appendChild(resetIcon);
            
            functionality.addClearTextBtn(resetIcon,inputBox);
           
        }
    };

    const taskIcons = (parent, id) => {
        
        if(parent.children.length == 0)
        {
            const pencilIcon = displaySVG({
                className: "icon-square-edit-outline", // optional
                viewBox: "0 0 24 24",
                pathD: "M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z",
                titleText: "square-edit-outline"
            });
            parent.appendChild(pencilIcon);
            
            const addTaskWindow = document.querySelector(".add-task-window");
            functionality.addOpenDialogWinBtn(pencilIcon, addTaskWindow, false, id);
            
            const deleteIcon = displaySVG({
                className: "icon-delete", // optional
                viewBox: "0 0 24 24",
                pathD: "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",
                titleText: "delete"
            });
            parent.appendChild(deleteIcon);
            functionality.deleteTaskIcon(deleteIcon,id);
 
        };
        
    };

    const projectEditIcons = (parent, id) => {
        if(parent.children.length == 0)
        {
            const pencilIcon = displaySVG({
                className: "icon-square-edit-outline", // optional
                viewBox: "0 0 24 24",
                pathD: "M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z",
                titleText: "square-edit-outline"
            });
            parent.appendChild(pencilIcon);
            const addTaskWindow = document.querySelector(".add-list-window");
            functionality.addNewListBtn(pencilIcon, false, id);
            
            const deleteIcon = displaySVG({
                className: "icon-delete", // optional
                viewBox: "0 0 24 24",
                pathD: "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",
                titleText: "delete"
            });
            parent.appendChild(deleteIcon);
            functionality.deleteProjectIcon(deleteIcon, id);
 
        }
    };
    
    const displayTasks = (parent, arrayOfTasks) => {
        const arr = Array.from(arrayOfTasks);
        arr.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            parent.appendChild(taskDiv);

            const input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", `${task.getId()}`);
            taskDiv.appendChild(input);

            const label = document.createElement("label");
            taskDiv.appendChild(label);

            const taskHeader = document.createElement("div");
            taskHeader.classList.add("task-header");
            label.appendChild(taskHeader);

            const taskName = document.createElement("p");
            taskName.textContent = `${task.name}`;
            taskHeader.appendChild(taskName);

            task.labels.forEach((label) => {
                const button = document.createElement("button");
                if(label == "important")
                {
                    button.textContent = toUpperCaseFirstChar(label);
                    button.classList.add("important-btn");
                }
                else if(label == "date")
                {
                    button.textContent = format(task.date, 'MMM d');
                    button.classList.add("date-btn");
                }
                else   
                {
                    button.textContent = format(task.date, 'h:mm aa');
                    button.classList.add("date-btn");
                }
                taskHeader.appendChild(button);
            });

            const editTask = document.createElement("div");
            editTask.classList.add("edit-task");
            taskHeader.appendChild(editTask);

            const descDiv = document.createElement("div");
            descDiv.classList.add("task-description");
            label.appendChild(descDiv);

            const desc = document.createElement("p");
            desc.textContent = task.desc;
            descDiv.appendChild(desc);

            functionality.editTaskIcons(taskDiv);
            functionality.checkedDiv(taskDiv);
        });
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.classList.add("task-add-task");
        parent.appendChild(taskDiv);

        const addNewTasklSVG = displaySVG({
            className: "icon plus-task",
            viewBox: "0 0 24 24",
            pathD: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
            titleText: "plus"
        });
        taskDiv.appendChild(addNewTasklSVG);

        const addTaskText = document.createElement("p");
        addTaskText.textContent = "Add Task";
        taskDiv.appendChild(addTaskText);

        const addTaskWindow = document.querySelector(".add-task-window");

        functionality.addOpenDialogWinBtn(taskDiv, addTaskWindow, true); 

    };

    const displaySectionHeader = (parent, headerName, iconOn, pageName) => {
        const section = document.createElement("div");
        section.classList.add(`${headerName}`);
        parent.appendChild(section);

        const sectionHeader = document.createElement("div");
        sectionHeader.classList.add("task-section-header");
        section.appendChild(sectionHeader);
        
        if(iconOn)
        {
            const sectionHeaderImg = document.createElement("img");
            sectionHeaderImg.src = images[headerName];
            sectionHeaderImg.alt = `${headerName}-icon`;
            sectionHeaderImg.classList.add("emoji-icon");
            sectionHeader.appendChild(sectionHeaderImg);
        }
            
        const header = document.createElement("h5");
        const strBfr = (pageName == "past") ? "Last " : "This ";
        const headerCurrentName = toUpperCaseFirstChar(headerName);
        const headerText = (displayStringBefore(headerCurrentName)) ?  strBfr + headerCurrentName : headerCurrentName;
        header.textContent = headerText;
        sectionHeader.appendChild(header);

        display.dropDownMenu(sectionHeader, true);
        functionality.addDropdownMenuBtn();
        addTaskIconAllHdr(sectionHeader);

        const tasks = document.createElement("div");
        tasks.classList.add("tasks");
        section.appendChild(tasks);

        const tasksInHdr = AllTasks.getTaskFromHdrName(allTasksOfUser.getTasksFromName(pageName), headerName);
        display.displayTasks(tasks, tasksInHdr);
    };

    const allHeader = (name) => {
    const header = document.querySelector(".task-section-header>h5");
    header.textContent = toUpperCaseFirstChar(name);
    };

    const addTaskIconAllHdr = (parent) => {
        const dropdownMenu = parent.querySelector(".dropdown-menu");
        
        const div = document.createElement("div");
        div.classList.add("hover");
        parent.insertBefore(div, dropdownMenu);

        const descHdr = document.createElement("p");
        const text = AllTasks.getTimeDesc(`${currentPage.header}`);
        if(text != "")
        {
            descHdr.textContent = `(${text})`;
            div.appendChild(descHdr);
        }

        const addNewTaskSVG = displaySVG({
            className: "icon plus-task",
            viewBox: "0 0 24 24",
            pathD: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
            titleText: "plus"
        });
        
        div.appendChild(addNewTaskSVG);

        const addTaskWindow = document.querySelector(".add-task-window");
        functionality.addOpenDialogWinBtn(addNewTaskSVG, addTaskWindow, true);
    };

    const displayProject = (parent, projectObj) => {
        const btn =  parent.querySelector("[id='" + `${projectObj.getId()}` + "']");
        if(btn != undefined)
        {
            const icon = btn.querySelector("img.icon");
            icon.src = projectIcons[projectObj.icon];

            const header = btn.querySelector(".project-text>p");
            header.textContent = projectObj.name;

            btn.style.border = `1px solid ${projectObj.color}`;
            btn.style.borderLeft= `8px solid ${projectObj.color}`;

        }
        else
        {
            const project = document.createElement("button");
            project.classList.add("project");
            project.setAttribute("id", `${projectObj.getId()}`);
            project.style.border = `1px solid ${projectObj.color}`;
            project.style.borderLeft= `8px solid ${projectObj.color}`;
            parent.appendChild(project);

            const icon = document.createElement("img");
            icon.src = projectIcons[projectObj.icon];
            icon.classList.add("icon");
            project.appendChild(icon);

            const textDiv = document.createElement("div");
            textDiv.classList.add("project-text");
            project.appendChild(textDiv);

            const header = document.createElement("p");
            header.textContent = projectObj.name;
            textDiv.appendChild(header);

            const editDiv = document.createElement("div");
            editDiv.classList.add("edit-project");
            project.appendChild(editDiv); 

            functionality.addProjectBtn(project);
        }
        
    };
 
    return {navbar, menuButtonSection, dropDownMenu, mainPage, addLabelsWindow, labels, textClearBtn, inputClearBtn, taskIcons, dialogWindowText, displayTasks, displaySectionHeader, allHeader, addTaskIconAllHdr, displayProject, projectEditIcons,projectWinText };
})();