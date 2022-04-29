const db = require('./connection')
const cTable = require('console.table');

function allDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });
}

function allRoles() {
    db.query('SELECT * FROM employee_role', function (err, results) {
        console.table(results);
    });
}

function getAllRoles(a) {
    let allRoles = [];
    db.query('SELECT title, id FROM employee_role', a);
}

function getAllEmployees(a) {
    let allEmployees = [];
    db.query('SELECT first_name, last_name, id FROM employees', a)
}

function getAllDepartments(a) {
    let allDepartments = [];
    db.query('SELECT id, dept_name FROM department', a);
}

function allEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
    })
}

function addDepartment(dept_name, dept_id) {
    db.query('INSERT INTO department (id, dept_name) VALUES (?, ?)', [dept_id, dept_name], function (err, results) {
        console.log("Department created successfully!")
        console.log(err);
    })
}

function addRole(role_id, role_name, role_salary, dept_id) {
    db.query('INSERT INTO employee_role (id, title, salary, dept_id) VALUES (?, ?, ?, ?)', [role_id, role_name, role_salary, dept_id] , function (err, results) {
        console.log("Role created successfully!")
        console.log(err);
    })
}


function addEmployee(employee_first, employee_last, role_id, employee_manager) {
    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employee_first, employee_last, role_id, employee_manager], function (err, results) {
        console.log("New employee has been added to the database.")
        console.log(err);
        
    }) 
}

function removeEmployee() {
    db.query('')
}


function removeRole() {
    db.query('')
}

function removeDepartment() {
    db.query('')
}

function updateEmployee() {

}

function updateEmployeeManager() {

}

function exit() {
    console.log("Goodbye!");
}

// function addRole(department_name) {
//     db.query('INSERT INTO ')
// }

module.exports = {
    allDepts,
    allRoles,
    allEmployees,
    addDepartment,
    addRole,
    getAllRoles,
    getAllEmployees, 
    addEmployee, 
    getAllDepartments, 
    removeEmployee,
    removeRole,
    removeDepartment
    
}

// // 6. Create functions to handle each of the following (use SQL queries to accomplish this):
// - View all employees (Shown Above?)
// - View all employees by department
// - View all employees by manager
// - Add employee
// - Add department
// - Add role
// - Remove employee
// - Remove role
// - Update employee role
// - Update employee manager
// - Exit