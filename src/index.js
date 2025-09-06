import "./styles.css";
import { functionality } from "./functionality";

functionality.addMenuBtn();
functionality.addThemeBtn();

const dropdownMenus = document.querySelectorAll(".dropdown-menu");

dropdownMenus.forEach((dropdownMenu) => {
    dropdownMenu.addEventListener("click", () => {
        
        const upIcon = dropdownMenu.querySelector(".up");
        const downIcon = dropdownMenu.querySelector(".down");

        const isOpen = dropdownMenu.classList.toggle("open");

        const elementToHide = dropdownMenu.parentNode.nextElementSibling;

        if(isOpen)
        {
            upIcon.style.opacity = "100%";
            downIcon.style.opacity = "0%"
            elementToHide.style.display = "flex";
        }
        else
        {
            upIcon.style.opacity = "0%";
            downIcon.style.opacity = "100%";
            elementToHide.style.display = "none"

        }
    });
});

