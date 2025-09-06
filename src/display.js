import listImage from "./images/list.svg";
import { images, buttonTypes, page, nameFlags, currentPage} from "./default";
import { functionality } from "./functionality";

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

const displaySectionHeaders = (parent, headerNames, iconOn) => {
    headerNames.forEach((headerName) => {

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
        const headerCurrentName = toUpperCaseFirstChar(headerName);
        console.log(headerCurrentName);
        console.log(displayStringBefore(headerCurrentName));
        const headerText = (displayStringBefore(headerCurrentName)) ?  "This " + headerCurrentName : headerCurrentName;
        header.textContent = headerText;
        sectionHeader.appendChild(header);

        display.dropDownMenu(sectionHeader, true);

        const tasks = document.createElement("div");
        tasks.classList.add("tasks");
        section.appendChild(tasks);
    });
}

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
}

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

        const projects = document.createElement("div");
        projects.classList.add("projects");
        navbar.appendChild(projects);

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

    const mainPage = (name) => {
        const content = document.querySelector("#content");

        const mainPage = document.createElement("div");
        mainPage.classList.add("page");
        content.appendChild(mainPage);

        displayMainPageHeader(mainPage, name);

        const tasksSection = document.createElement("div");
        tasksSection.classList.add("tasks-section");
        mainPage.appendChild(tasksSection);

        displaySectionHeaders(tasksSection, page[name], (name == "today") ? true: false);

        functionality.addDropdownMenuBtn();
    };

    return {navbar, menuButtonSection, dropDownMenu, mainPage};
})();