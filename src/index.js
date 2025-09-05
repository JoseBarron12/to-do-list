import "./styles.css";

console.log("test3334");

const menuButton = document.querySelector(".menu-tab>svg");

menuButton.addEventListener("click", () => {
    const main = document.querySelector("main");
    const mainContent = document.querySelector(".main-content");

    if(main.children.length == 2) // sidebar opened
    {
        main.children[0].remove();
        mainContent.style.width = "100%";

    }
    else // sidebar close
    {

    }

    
});