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
    taskType = []; // type: different projects, or time assignment
    taskDesc = []; // important, or other descriptors that distinguihs task

    constructor (name, desc, dueDate, type, descriptor)
    {
        this.id = crypto.randomUUID();
        this.name = name;
        this.desc = desc;
        this.date = dueDate;
        this.taskType.push(type);
        this.taskDesc.push(descriptor);
    }

    getId() {
        return this.id;
    }

    get taskName() {
        return this.name;
    }
    set taskName(newName) {
        this.name = newName;
    }
    
    get taskDescription() {
        return this.desc;
    }
    set taskDescription(newDesc)
    {
        this.desc = newDesc;
    }
    
    get taskDate() {
        return this.date
    }
    set taskDate(newDate) {
        this.date = newDate;
    }

    get taskTypes() {
        return this.taskType;
    }

    get taskDescriptors() {
        return this.taskDesc;
    }

    /* 
    addType(newType) {
        this.taskType.push(newType);
    }

    removeType(typeToRemove) {
        
        const isEqualTo = (element) => element == typeToRemove;
        this.taskType.splice(this.taskType.findIndex(isEqualTo),1);
    }*/

}

export {Page,Task}