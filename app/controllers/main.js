import { Person, Student, Employee, Customer } from '../models/person.js';
import { ListPerson } from '../models/listPerson.js'


const setDisplay = (fields, display) => {
    fields.forEach(field => field.parentElement.style.display = display);
}

const typeSelect = document.querySelector('#loai');
const studentFields = document.querySelectorAll('#math, #physical, #chemistry');
const employeeFields = document.querySelectorAll('#workDays, #dailySalary');
const customerFields = document.querySelectorAll('#companyName, #orderValue, #rating');

const showType = () => {
    typeSelect.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'Student') {
            setDisplay(studentFields, 'block');
            setDisplay(employeeFields, 'none');
            setDisplay(customerFields, 'none');
        } else if (selectedValue === 'Employee') {
            setDisplay(studentFields, 'none');
            setDisplay(employeeFields, 'block');
            setDisplay(customerFields, 'none');
        } else if (selectedValue === 'Customer') {
            setDisplay(studentFields, 'none');
            setDisplay(employeeFields, 'none');
            setDisplay(customerFields, 'block');
        } else {
            setDisplay(studentFields, 'none');
            setDisplay(employeeFields, 'none');
            setDisplay(customerFields, 'none');
        }
    });
};

const personList = new ListPerson();


const addPerson = () => {
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const email = document.querySelector('#email').value;
    const type = document.querySelector('#loai').value;

    let newUser;
    if (type === 'Student') {
        const math = document.querySelector('#math').value;
        const physical = document.querySelector('#physical').value;
        const chemistry = document.querySelector('#chemistry').value;
        newUser = new Student(id, 'Student', name, address, email, math, physical, chemistry);
    } else if (type === 'Employee') {
        const workDays = document.querySelector('#workDays').value;
        const dailySalary = document.querySelector('#dailySalary').value;
        newUser = new Employee(id, 'Employee', name, address, email, workDays, dailySalary);
    } else if (type === 'Customer') {
        const companyName = document.querySelector('#companyName').value;
        const orderValue = document.querySelector('#orderValue').value;
        const rating = document.querySelector('#rating').value;
        newUser = new Customer(id, 'Customer', name, address, email, companyName, orderValue, rating);
    }

    personList.addPerson(newUser);
}



const renderTable = (personList) => {
    const tbody = document.querySelector('#tbodyPerson');
    tbody.innerHTML = '';

    for (const person of personList.list) {
        const tr = document.createElement('tr');
        tr.classList.add('text-center');
        tr.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.address}</td>
            <td>${person.email}</td>
            <td>${person.type}</td>
            <td>
                <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal">Cập nhật</button>
                <button class="btn btn-danger btn-sm">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    };
}


const saveToLocalStorage = (personList) => {
    localStorage.setItem('personList', JSON.stringify(personList.list));
}

const loadFromLocalStorage = () => {
    const data = localStorage.getItem('personList') ? JSON.parse(localStorage.getItem('personList')) : [];
    personList.list = data.map(p => {
        const { id, name, address, email, math, physical, chemistry, workDays, dailySalary, companyName, orderValue, rating } = p
        console.log("p: ", p);
        if (p.type === "Student") {
            return new Student(id, 'Student', name, address, email, math, physical, chemistry)
        } else if (p.type === "Employee") {
            return new Employee(id, 'Employee', name, address, email, workDays, dailySalary)
        } else if (p.type === "Customer") {
            return new Customer(id, 'Customer', name, address, email, companyName, orderValue, rating)
        }
    });
    renderTable(personList)
}

loadFromLocalStorage()

document.querySelector('#btnThem').onclick = () => {
    document.querySelector('#btnCapNhat').style.display = 'none'
    setDisplay(studentFields, 'none');
    setDisplay(employeeFields, 'none');
    setDisplay(customerFields, 'none');
    typeSelect.value = '';
    studentFields.forEach(field => field.value = '');
    employeeFields.forEach(field => field.value = '');
    customerFields.forEach(field => field.value = '');
    showType()
}

document.querySelector('#btnThemPerson').onclick = () => {
    addPerson()
    saveToLocalStorage(personList)
    renderTable(personList)
}

const removeBtns = document.querySelectorAll('.btn-danger');
for (const btn of removeBtns) {
    btn.addEventListener('click', (event) => {
        const tr = event.target.closest('tr');
        console.log("tr: ", tr);
        const id = tr.querySelector('td').textContent;
        personList.removePerson(id);
        saveToLocalStorage(personList)
        renderTable(personList);
    });
}

const updateBtns = document.querySelectorAll('.btn-success');
for (const btn of updateBtns) {
    btn.addEventListener('click', (event) => {
        document.querySelector('#btnThemPerson').style.display = 'none'
        const tr = event.target.closest('tr');
        const id = tr.querySelector('td').textContent;
        const person = personList.list.find(person => person.id === id);
        const selectedValue = person.type;
        if (selectedValue === 'Student') {
            setDisplay(studentFields, 'block');
            setDisplay(employeeFields, 'none');
            setDisplay(customerFields, 'none');
        } else if (selectedValue === 'Employee') {
            setDisplay(studentFields, 'none');
            setDisplay(employeeFields, 'block');
            setDisplay(customerFields, 'none');
        } else if (selectedValue === 'Customer') {
            setDisplay(studentFields, 'none');
            setDisplay(employeeFields, 'none');
            setDisplay(customerFields, 'block');
        } else {
            setDisplay(studentFields, 'none');
            setDisplay(employeeFields, 'none');
            setDisplay(customerFields, 'none');
        }
        document.querySelector('#id').value = person.id;
        document.querySelector('#name').value = person.name;
        document.querySelector('#address').value = person.address;
        document.querySelector('#email').value = person.email;
        document.querySelector('#loai').value = person.type;
    });
}

const updateBtn = document.querySelector('#btnCapNhat');
updateBtn.addEventListener('click', () => {
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const email = document.querySelector('#email').value;
    const type = document.querySelector('#loai').value;
    const math = document.querySelector('#math').value;
    const physical = document.querySelector('#physical').value;
    const chemistry = document.querySelector('#chemistry').value;
    const workDays = document.querySelector('#workDays').value;
    const dailySalary = document.querySelector('#dailySalary').value;
    const companyName = document.querySelector('#companyName').value;
    const orderValue = document.querySelector('#orderValue').value;
    const rating = document.querySelector('#rating').value;

    personList.updatePerson(id, { name, address, email, type, math, physical, chemistry, workDays, dailySalary, companyName, orderValue, rating });

    renderTable(personList);
    saveToLocalStorage(personList);
});


let isSorted = false;
const originalList = [...personList.list];

const sortNameBtn = document.querySelector('#sortName');
sortNameBtn.addEventListener('click', () => {
    if (!isSorted) {
        personList.list.sort((a, b) => a.name.localeCompare(b.name));
        isSorted = true;
    } else {
        personList.list = [...originalList];
        isSorted = false;
    }
    renderTable(personList);
});

const filterByType = (listPerson, type) => {
    if (type === 'all') {
        return listPerson.list;
    } else {
        return listPerson.list.filter(person => person.type === type);
    }
}

const selLoai = document.querySelector('#selLoai');
selLoai.addEventListener('change', () => {
    const type = selLoai.value;
    const filteredList = filterByType(personList, type);
    renderTable({ list: filteredList });
});