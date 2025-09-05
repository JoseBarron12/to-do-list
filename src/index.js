import "./styles.css";
import { display } from "./display";

console.log("test3334");


const menuButton = document.querySelector(".menu-tab>svg");

menuButton.addEventListener("click", () => {
    const main = document.querySelector("main");
    const mainContent = document.querySelector(".main-content");

    if(main.children.length != 1) // sidebar opened
    {
        main.children[0].remove();
        mainContent.style.width = "100%";
        display.menuButtonSection(false);

    }
    else // sidebar close
    {
        display.navbar();
        mainContent.style.width = "calc(100% - var(--side-bar-width))";
        display.menuButtonSection(true);
    }

    
});


const toggleThemebtn = document.querySelector(".theme")

toggleThemebtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme == 'dark' ? 'light' : 'dark';

    const lightIcon = document.querySelector(".light");
    const darkIcon = document.querySelector(".dark");
    
    if(newTheme == 'light')
    {
        lightIcon.style.opacity = "0%";
        darkIcon.style.opacity = "100%"
    }
    else
    {
        lightIcon.style.opacity = "100%";
        darkIcon.style.opacity = "0%"
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
});