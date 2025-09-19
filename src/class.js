import { isToday, isPast, isFuture, isYesterday, isSameWeek, isSameMonth, isSameYear, differenceInDays, differenceInHours, differenceInMinutes, format, startOfDay, startOfTomorrow, endOfToday, endOfYesterday, differenceInSeconds, isTomorrow, addHours, setHours, startOfYesterday, getYear, startOfToday } from "date-fns";
import { getHours} from "date-fns/fp";
import { set } from "date-fns";
import { currentPage } from "./default";


const isWithinAWeek = (date) => {
    const hrsApart = Math.abs(differenceInHours(date, new Date()));
    return !isTomorrow(date)  && !isYesterday(date) && hrsApart <= 24 * 7;
};

const isWithin24Hrs = (date) => {
    const hrsApart = Math.abs(differenceInHours(date, new Date()));
    return hrsApart <= 24;
};

const isWithinAMonth = (date) => {
    const hrsApart = Math.abs(differenceInHours(date, new Date()));
    const daysApart = Math.abs(differenceInDays(date, new Date()));
    return hrsApart >= 24 * 7 && daysApart <= 30;
};

const isWithinAYear = (date) => {
    const daysApart = Math.abs(differenceInDays(date, new Date()));
    return isSameYear(date, new Date()) && daysApart >= 30;
};

const compareDates = (a, b) => {
    
    const secondsA = differenceInSeconds(a.date, startOfToday());
    const secondsB = differenceInSeconds(b.date, startOfToday());
    
    return secondsB - secondsA;  
};

const checkDate = (a) => {
    return differenceInSeconds(a.date, startOfToday()) < 0;
}


const isWithinHour = (date) => {
    const minsApart = Math.abs(differenceInMinutes(date, new Date()));
    return minsApart <= 60;
};

const isMorning = (date) => {
    const hours = getHours(date);
    return hours >= 4 && hours < 12;
};

const isAfternoon = (date) => {
    const hours = getHours(date);
    return hours >= 12 && hours < 17;
};

const isEvening = (date) => {
    const hours = getHours(date);
    return hours >= 17 || hours < 4;
};

class Page {
    constructor(currentPage)
    {
        this.currentPage = currentPage
        this.currentHeader = "all";
    };
    get page() {
        return this.currentPage;
    }
    set page(newPage) {
        this.currentPage = newPage;
    }

    get header() {
        return this.currentHeader;
    }

    set header(newHeader) {
        this.currentHeader = newHeader;
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

    isImportantTask() {
        const isEqualTo = (element) => element == "important";
        const result = this.taskLabels.findIndex(isEqualTo);
        if(result != -1 ) return true;
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
        AllTasks.sortbyDate(this.allTasks);
        this.sortTasksbyDate();
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

    sortTasksbyDate() {
        const testTasks = this.allTasks;
        let index = testTasks.findIndex(checkDate)

        if(index != 0)
        {
            const positiveNums = testTasks.slice(0,index).reverse();
            const negativeNums = testTasks.slice(index,testTasks.length);

            const newAllTasks = positiveNums.concat(negativeNums);
            this.allTasks = newAllTasks;
        }
        else
        {
            this.allTasks.reverse();
        }    
    }


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

    static getNowTasks(array)
    {
        return array.filter((task) => isWithinHour(task.date));
    };

    static getMorningTasks(array)
    {
        return array.filter((task) => isMorning(task.date));
    };

    static getAfternoonTasks(array)
    {
        return array.filter((task) => isAfternoon(task.date));
    };

    static getEveningTasks(array)
    {
        return array.filter((task) => isEvening(task.date));
    };

    static getPastTasks(array)
    {
        return array.filter((task) => isPast(task.date) && !isToday(task.date));
    };

    static getYesterdayTasks(array)
    {
        return array.filter((task) => isYesterday(task.date));
    }

    static getFutureTasks(array)
    {
        return array.filter((task) => isFuture(task.date) && !isToday(task.date));
    };

    static getTmrTasks(array)
    {
        return array.filter((task) => isTomorrow(task.date));
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
    };

    static getTaskFromHdrName(array,name)
    {
        switch (name) {
            case "now":
                return this.getNowTasks(array);
            case "morning":
                return this.getMorningTasks(array);
            case "afternoon":
                return this.getAfternoonTasks(array);
            case "evening":
                return this.getEveningTasks(array);
            case "tommorow":
                return this.getTmrTasks(array);
            case "yesterday":
                return this.getYesterdayTasks(array);
            case "week":
                return this.getWeekTasks(array);
            case "month":
                return this.getMonthTasks(array);
            case "year":
                return this.getYearTasks(array);
            default:
                return array;
        }
    };

    static getDateMin(name)
    {
        switch (name) {
            case "all":
                return "";
            case "today":
                return format(startOfDay(new Date()), "yyyy-MM-dd");
            case "past":
                return "";
            case "upcoming":
                return format(startOfTomorrow(new Date()), "yyyy-MM-dd");
        }
    };

    static getDateMax(name)
    {
        switch (name) {
            case "all":
                return "";
            case "today":
                return format(endOfToday(new Date()), "yyyy-MM-dd");
            case "past":
                return format(endOfYesterday(new Date()), "yyyy-MM-dd");
            case "upcoming":
                return "";
        }
    };

    static getTimeMin(name)
    {
        switch (name) {
            case "all":
                return "";
            case "now":
                return format(new Date(), "HH:mm");
            case "morning":
                return format(set(new Date(), {hours: 4, minutes: 0}), "HH:mm");
            case "afternoon":
                return format(set(new Date(), {hours: 12, minutes: 0}), "HH:mm");
            case "evening": 
                return format(set(new Date(), {hours: 17, minutes: 0}), "HH:mm");
        }
    };

    static getTimeMax(name)
    {
        switch (name) {
            case "all":
                return "";
            case "now":
                return format(addHours(new Date(), 1), "HH:mm");
            case "morning":
                return format(set(new Date(), {hours: 12, minutes: 0}), "HH:mm");
            case "afternoon":
                return format(set(new Date(), {hours: 17, minutes: 0}), "HH:mm");
            case "evening": 
                return format(set(new Date(), {hours: 4, minutes: 0}), "HH:mm");
        }
    };

    static sortbyDate(array)  {
        array.sort(compareDates);
    };

    static getNumOfImportantTasks(array) {
        let numOfImpTasks = 0;
        array.forEach(task => {
            if(task.isImportantTask())
            {
                console.log("worksss")
                numOfImpTasks++;
            }
        });
        return numOfImpTasks;
    };

    static getTimeDesc(name) {
        switch (name) {
            case "all":
                if(currentPage.page == "today") return format(new Date(), 'eee MMM do');
                return ""
            case "now":
                return ">1hr";
            case "morning":
                return "4am-12pm";
            case "afternoon":
                return "12pm-5pm";
            case "evening": 
                return "5pm-4am";
            case "tommorow":
                return format(startOfTomorrow(), 'eee MMM do');
            case "yesterday":
                return format(startOfYesterday(), 'eee MMM do');
            case "week":
                return "Within 7 days";
            case "month":
                return "Within 30 days"
            case "year":
                return getYear(new Date());
            default:
                return "";
        }
    }

};

export {Page,Task, Labels, AllTasks}