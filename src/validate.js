export const isValid = (function() {
    const name = (inputName) => {
        return (inputName.replace(/^\s+|\s+$/gm,'').length != 0) ? true : false;
    }

    const addTaskForm = () => {
        const form = document.querySelector("#add-task-form");

        const taskName = form.querySelector('input[id="task-name"]');
        console.log(taskName.value);

        const labelOptions = form.querySelector(".label-inputs");
       
        if(labelOptions.children.length != 0)
        {
            const taskLabels = labelOptions.querySelectorAll('input[type="checkbox"]');
            taskLabels.forEach(label => {
                console.log(label.name);
            });
        }
        
        const taskDate = form.querySelector('input[id="task-date"]');
        console.log(taskDate.value);

        const taskTime = form.querySelector('input[id="task-time"]');
        console.log(taskTime.value);

        const taskDesc = form.querySelector('textarea[id="task-desc"]');
        console.log(taskDesc.value);
    }
    return {name, addTaskForm};
})();