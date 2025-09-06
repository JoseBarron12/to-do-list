import "./styles.css";
import { functionality } from "./functionality";

functionality.addMenuBtn();
functionality.addThemeBtn();


const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownMenu.addEventListener("click", () => {
    const currentDirection = dropdownMenu.getAttribute("id");
    const newDirection = (currentDirection) == "up" ? "down" : "up";
    dropdownMenu.setAttribute("id", `${newDirection}`);

    const upIcon = document.querySelector(".up");
    const downIcon = document.querySelector(".down");

    if(newDirection == "up")
    {
        upIcon.style.opacity = "100%";
        downIcon.style.opacity = "0%"
    }
    else
    {
        upIcon.style.opacity = "0%";
        downIcon.style.opacity = "100%"
    }
});