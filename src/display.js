import listImage from "./images/list.svg";
import allImage from "./images/all.svg";
import todayImage from "./images/today.svg";
import upcomingImage from "./images/upcoming.svg";
import pastImage from "./images/past.svg";

const images = {
    all: allImage,
    today: todayImage,
    upcoming: upcomingImage,
    past: pastImage,
};

const buttonTypes = ["all", "today", "upcoming", "past"];

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
            sidebarOptions.appendChild(button);

            const buttonImg = document.createElement("img");
            buttonImg.src = images[buttonType];
            buttonImg.alt = `${buttonType}-icon`;
            buttonImg.classList.add("icon");
            button.appendChild(buttonImg);

            const buttonHeader = document.createElement("h5");
            buttonHeader.textContent = buttonType.charAt(0).toUpperCase() + buttonType.slice(1);
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

    };
    const menuButtonSection = (navbarOpened) => {
        const menuTab = document.querySelector(".menu-tab");
        menuTab.style.backgroundColor = (navbarOpened) ? "var(--secondary)" : "var(--primary)";
    }

    return {navbar, menuButtonSection};
})();