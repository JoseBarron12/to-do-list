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
        this.taskLabels.push(label);
        if(project !== undefined) this.taskProjects.push(project);
    }

    getId() {
        return this._id;
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
    
    get projects()
    {
        return this.taskProjects;
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
    }

}

class Labels {
    defaultLabels = ["important", "date", "time", "date-time"];
    currentLabels = [];
    constructor() {

    }

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

}

export {Page,Task, Labels}