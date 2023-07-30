export class ListPerson {
    constructor() {
        this.list = [];
    }

    addPerson(person) {
        this.list.push(person);
    }
    
    removePerson(id) {
        this.list = this.list.filter(person => person.id !== id);
    }
    
    updatePerson(id, data) {
        const person = this.list.find(person => person.id === id);
        if (person) {
            Object.assign(person, data);
        }
    }
}