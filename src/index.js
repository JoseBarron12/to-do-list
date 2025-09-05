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

    }
    else // sidebar close
    {
        display.navbar();
        mainContent.style.width = "calc(100% - var(--side-bar-width))";
    }

    
});