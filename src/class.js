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

    constructor (name, desc, dueDate, type, label)
    {
        this._id = crypto.randomUUID();
        this._name = name;
        this._desc = desc;
        this._date = dueDate;
        this._type = type; // today, upcoming, past
        this.taskLabels.push(label);
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

    get types() {
        return this.taskTypes;
    }

    get labels() {
        return this.taskLabels;
    }

    get type() {
        return this._type;
    }

    set type(newType) {
        this._type = newType;
    }

    /*
    addType(newType) {
        this.taskTypes.push(newType);
    };

    removeType(typeToRemove) {
        
        const isEqualTo = (element) => element == typeToRemove;
        this.taskTypes.splice(this.taskTypes.findIndex(isEqualTo),1);
    };*/ 

}

export {Page,Task}