import { isToday, isPast, isFuture, isYesterday, isSameWeek, isSameMonth, isSameYear, differenceInDays, differenceInHours } from "date-fns";

const isWithinAWeek = (date) => {
    const hrsApart = Math.abs(differenceInHours(date, new Date()));
    return hrsApart > 24 && hrsApart <= 24 * 7;
};

const isWithin24Hrs = (date) => {
    const hrsApart = Math.abs(differenceInHours(date, new Date()));
    return hrsApart <= 24;
};

const isWithinAMonth = (date) => {
    const daysApart = Math.abs(differenceInDays(date, new Date()));
    return daysApart > 7 && daysApart <= 30;
};

const isWithinAYear = (date) => {
    const daysApart = Math.abs(differenceInDays(date, new Date()));
    return isSameYear(date, new Date()) && daysApart >= 30;
};


class Page {
    constructor(currentPage)
    {
        this.currentPage = currentPage
    };
    get page() {
        return this.currentPage;
    }
    set page(newPage) {
        this.currentPage = newPage;
    }

}

class Task {
    taskProjects = [];
    taskLabels = []; // important, or other descriptors that distinguihs task

    constructor (name, desc, dueDate, type, label, project)
    {
        this._id = crypto.randomUUID();
        this._name = name;
        this._desc = desc;
        this._date = dueDate;
        this._type = type; // today, upcoming, past
        if(label !== undefined) this.taskLabels.push(label);
        if(project !== undefined) this.taskProjects.push(project);
    }

    getId() {
        return this._id;
    }
    setId(newId) {
        this._id = newId;
    }

    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    
    get desc() {
        return this._desc;
    }
    set desc(newDesc)
    {
        this._desc = newDesc;
    }
    
    get date() {
        return this._date
    }
    
    set date(newDate) {
        this._date = newDate;
    }

    get type() {
        return this._type;
    }

    set type(newType) {
        this._type = newType;
    }
    
    get labels() {
        return this.taskLabels;
    }
    
    set labels(newLabel) {
        this.taskLabels = newLabel;
    }

    get projects()
    {
        return this.taskProjects;
    }

    set projects(newProject) {
        this.taskProjects = newProject;
    }
 
    addLabel(newLabel) {
        this.taskLabels.push(newLabel);
    };

    removeLabel(labelToRemove) {   
        const isEqualTo = (element) => element == labelToRemove;
        const result = this.taskLabels.findIndex(isEqualTo);
        if(result != -1 ) this.taskLabels.splice(result,1);
    };

    addProject(newProject) {
        this.taskProjects.push(newProject);
    };

    removeProject(projectToRemove) {
        const isEqualTo = (element) => element == projectToRemove;
        const result = this.taskProjects.findIndex(isEqualTo);
        if(result != -1 ) this.taskProjects.splice(result,1);
    };

    editAllOfTask(name, desc, date, type, labels, projects)
    {
        this._name = name;
        this._desc = desc;
        this._date = date;
        this._type = type;
        if(labels !== undefined) this.taskLabels = labels;
        if(projects !== undefined) this.taskProjects = projects;
    };


};

class Labels {
    defaultLabels = ["important", "date", "time"];
    currentLabels = [];
    constructor() {}

    get defLabels() {
        return this.defaultLabels;
    }

    get currLabels() {
        return this.currentLabels;
    }

    addLabel(newLabel) {
        const isEqualTo = (element) => element == newLabel;
        const result = this.currentLabels.findIndex(isEqualTo);
        if(result == -1 ) this.currentLabels.push(newLabel);
    }

    removeLabel(labelToRemove) {   
        const isEqualTo = (element) => element == labelToRemove;
        const result = this.currentLabels.findIndex(isEqualTo);
        if(result != -1 ) this.currentLabels.splice(result,1);
    };

    isCurrentLabel(labelToCheck){   
        const isEqualTo = (element) => element == labelToCheck;
        const result = this.currentLabels.findIndex(isEqualTo);
        if(result == -1 ) return false;
        return true;
    }
    deleteAllCurrLabels() {
        this.currentLabels = [];
    }

};


class AllTasks {
    allTasks = [];
    
    constructor () {};

    get allCurrentTask() {
        return this.allTasks;
    };

    set allCurrentTask(replacementTasks) {
        this.allTasks = replacementTasks;
    };

    addTask(newTask) {
        this.allTasks.push(newTask);
    };

    getTodayTasks() {
        return this.allCurrentTask.filter((task) => isToday(task.date));
    };

    getPastTasks() {
        return this.allCurrentTask.filter((task) => isPast(task.date) && !isToday(task.date));
    };

    getUpcomingTasks() {
        return this.allCurrentTask.filter((task) => isFuture(task.date) && !isToday(task.date));
    };


    getTasksFromName(name) {
        switch (name) {
            case "all":
                return this.allTasks;
            case "today":
                return this.getTodayTasks();
            case "upcoming":
                return this.getUpcomingTasks()
            case "past":
                return this.getPastTasks();
        }
    };

    removeTaskfromID(id) {
        const isEqualTo = (element) => element.getId() == id;
        const result = this.allTasks.findIndex(isEqualTo);
        if(result != -1 ) this.allTasks.splice(result,1);
    }; 

    getTaskFromId(id) {
        const isEqualTo = (element) => element.getId() == id;
        const result = this.allTasks.findIndex(isEqualTo);
        if(result != -1 ) return this.allTasks[result];
    };

    editTaskformID(id, name, desc, date, type, labels, projects) {
        const isEqualTo = (element) => element.getId() == id;
        const result = this.allTasks.findIndex(isEqualTo);
        if(result != -1 ) 
        {
            this.allTasks[result].editAllOfTask(name, desc, date, type, labels, projects)
        }
    };

    static getTdyTasks(array)
    {
        return array.filter((task) => isToday(task.date));
    };

    static getPastTasks(array)
    {
        return array.filter((task) => isPast(task.date) && !isToday(task.date));
    };

    static getYesterdayTasks(array)
    {
        return array.filter((task) => isWithin24Hrs(task.date));
    }

    static getFutureTasks(array)
    {
        return array.filter((task) => isFuture(task.date) && !isToday(task.date));
    };

    static getTmrTasks(array)
    {
        return array.filter((task) => isWithin24Hrs(task.date));
    }

    static getWeekTasks(array)
    {
        return array.filter((task) => isWithinAWeek(task.date) );
    };
    
    static getMonthTasks(array)
    {
        return array.filter((task) => isWithinAMonth(task.date));
    };

    static getYearTasks(array)
    {
        return array.filter((task) => isWithinAYear(task.date));
    }

    static getTaskFromHdrName(array,name)
    {
        switch (name) {
            case "tommorow":
                console.log(this.getTmrTasks(array));
                return this.getTmrTasks(array);
            case "yesterday":
                console.log(this.getYesterdayTasks(array));
                return this.getYesterdayTasks(array);
            case "week":
                return this.getWeekTasks(array);
            case "month":
                return this.getMonthTasks(array);
            case "year":
                return this.getYearTasks(array);
        }
    }

};


export {Page,Task, Labels, AllTasks}