export class Person {
    constructor(id, type, name, address, email) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.address = address;
        this.email = email;
    }
}

export class Student extends Person {
    constructor(id, type, name, address, email, math, physical, chemistry) {
        super(id, type, name, address, email);
        this.math = math;
        this.physical = physical;
        this.chemistry = chemistry;
    }
}

export class Employee extends Person {
    constructor(id, type, name, address, email, workDays, dailySalary) {
        super(id, type, name, address, email);
        this.workDays = workDays;
        this.dailySalary = dailySalary;
    }
}

export class Customer extends Person {
    constructor(id, type, name, address, email, companyName, orderValue, rating) {
        super(id, type, name, address, email);
        this.companyName = companyName;
        this.orderValue = orderValue;
        this.rating = rating;
    }
}
