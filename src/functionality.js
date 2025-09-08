import { display } from "./display";
import { currentPage } from "./default";

export const functionality = (function () {
    const addMenuBtn = () => {
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
    };

    const addThemeBtn = () => {
        const toggleThemebtn = document.querySelector(".theme")

        toggleThemebtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme == 'dark' ? 'light' : 'dark';

            const lightIcon = document.querySelector(".light");
            const darkIcon = document.querySelector(".dark");
            
            if(newTheme == 'light')
            {
                lightIcon.style.opacity = "0%";
                darkIcon.style.opacity = "100%";
            }
            else
            {
                lightIcon.style.opacity = "100%";
                darkIcon.style.opacity = "0%"
            }
            
            document.documentElement.setAttribute('data-theme', newTheme);

        });
    };

    const addDropdownMenuBtn = () => 
    {
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
    };

    const addNavbarBtn = () => {
        const navButtons = document.querySelectorAll(".sidebar-options>button");
        navButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                //remove current page
                const content = document.querySelector("#content");
                content.replaceChildren();
                
                navButtons.forEach((btns) => {
                    btns.classList.remove("active-btn");
                })
                
                btn.classList.add("active-btn");
                currentPage.page = btn.getAttribute("id");

                display.mainPage(btn.getAttribute("id"));
            });
        });
    };
    
    const addExitBtn = (btn,parentToClose) => {
        btn.addEventListener("click", (e) => {
            if(parentToClose instanceof HTMLDialogElement)
            {
                parentToClose.close();
            }
            else
            {
                parentToClose.remove();
            }
        });
    };

    const addOpenDialogWinBtn = (btn, parentToOpen) => {
        btn.addEventListener("click", () => {
            parentToOpen.show();
            const exitBtn = document.querySelector(".exit-button");
            addExitBtn(exitBtn,parentToOpen);

            const openLabelsWinBtn = document.querySelector(".open-labels");
            addOpenLabelsWinBtn(openLabelsWinBtn);
        });
    };

    const addOpenLabelsWinBtn = (btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            display.addLabelsWindow();
        });
    };

    return {addMenuBtn, addThemeBtn, addDropdownMenuBtn, addNavbarBtn, addExitBtn, addOpenDialogWinBtn, addOpenLabelsWinBtn};
})();