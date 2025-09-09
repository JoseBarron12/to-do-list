export const isValid = (function() {
    const name = (inputName) => {
        return (inputName.replace(/^\s+|\s+$/gm,'').length != 0) ? true : false;
    }

    const addTaskForm = () => {
        const form = document.querySelector("#add-task-form");

        const taskName = form.querySelector('input[id="task-name"]');
        console.log(taskName.value);
    }
    return {name, addTaskForm};
})();