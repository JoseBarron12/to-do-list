import { display } from "./display";
import { allTasksOfUser, currentPage } from "./default";
import { defaultLabels } from "./default";
import { update } from "./update";
import { isValid } from "./validate";

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
                    elementToHide.style.display = "grid";
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
                update.clearCurrentPage();
                
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
                update.clearForm(parentToClose);
                update.clearFormLabels();
                update.selectedFormLabels();
                parentToClose.close();

            }
            else
            {
                update.selectedFormLabels();
                parentToClose.remove();
            }
        });
    };

    const addOpenDialogWinBtn = (btn, parentToOpen) => {
        btn.addEventListener("click", () => {
            parentToOpen.showModal();
            const exitBtn = document.querySelector(".exit-button");
            addExitBtn(exitBtn,parentToOpen);

            update.clearForm(parentToOpen);
            addSubmitTaskBtn(parentToOpen);

            const textInputBox = parentToOpen.querySelector(".form-task-name");
            addClearText(textInputBox);

            const dateInputBox = parentToOpen.querySelector(".date");
            addClearInput(dateInputBox);
            
            const timeInputBox = parentToOpen.querySelector(".time");
            addClearInput(timeInputBox);

            const descInputBox = parentToOpen.querySelector(".form-task-desc");
            addClearTextArea(descInputBox);

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

    const addLabelBtns = () => {
        const labelBtns = document.querySelectorAll(".label-options>label");
        labelBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const selection = btn.querySelector('[type="checkbox"]');
                if(selection.checked)
                {
                    defaultLabels.addLabel(selection.getAttribute("name"));
                    update.selectedFormLabels();
                }
                else
                {
                    defaultLabels.removeLabel(selection.getAttribute("name"));
                    update.selectedFormLabels();
                    
                }
            })
        });
    };

    const addDeleteLabelBtn = (btn, elementToDelete, labelName) => {
        btn.addEventListener("click", () => {
            defaultLabels.removeLabel(labelName);
            elementToDelete.remove();
        })
    };

    const addSubmitTaskBtn = (window) => {
        const btn = document.querySelector("button.submit-button");
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            if(isValid.addTaskForm())
            {
                update.clearForm(window);
                update.clearFormLabels();
                update.selectedFormLabels();
                update.refreshCurrentPage();
                window.close();
            }
        });
    };

    const addClearText = (inputBox) => {
        const input = inputBox.querySelector("input");
        input.addEventListener("input", () => {
            display.textClearBtn(inputBox);
        });
    };

    const addClearInput = (inputBox) => {
        const input = inputBox.querySelector("input");
        input.addEventListener("input", () => {
            display.inputClearBtn(inputBox);
        });
    };

    const addClearTextArea = (inputBox) => {
        const input = inputBox.querySelector("textarea");
        input.addEventListener("input", () => {
            display.inputClearBtn(inputBox);
        });
    };

    const addClearTextBtn = (closeBtn, inputBox) => {
        closeBtn.addEventListener("click", () => {
            const input = inputBox.querySelector("input");
            if(input != null)
            {
                input.value = "";
            }
            else
            {
                const textArea = inputBox.querySelector("textarea");
                textArea.value = "";
            }
            closeBtn.remove();
        })
    };

    const closeAddLabelWin = (windowToClose) => {
        windowToClose.addEventListener("mouseleave", () => {
            windowToClose.remove();
        });
    };

    const editTaskIcons = (parent) => {
        parent.addEventListener("mouseenter", () => {
            const editTask = parent.querySelector(".edit-task");
            const input = parent.querySelector("input");
            display.taskIcons(editTask,input.getAttribute("id"));
            parent.addEventListener("mouseleave", () => {
                const icons = editTask.querySelectorAll("svg");
                icons.forEach((icon) => {
                    icon.remove();
                });
            });
        });
    };

    const deleteTaskIcon = (btn, id) => {
        btn.addEventListener("click", () => {
            allTasksOfUser.removeTaskfromID(id);
            update.savedTasks();
            update.refreshCurrentPage();
        });
    }


    return {addMenuBtn, addThemeBtn, addDropdownMenuBtn, addNavbarBtn, addExitBtn, addOpenDialogWinBtn, addOpenLabelsWinBtn, addLabelBtns, addDeleteLabelBtn, addSubmitTaskBtn, addClearText, addClearTextBtn, closeAddLabelWin, editTaskIcons, deleteTaskIcon};
})();