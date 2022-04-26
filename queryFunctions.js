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

function allEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
    })
}

function addDepartment(dept_name) {
    db.query('INSERT INTO department (dept_name) VALUES (?)', dept_name, function (err, results) {
        console.log("Department created successfully!")
        console.log(err);
    })
}

function addRole(role_name) {
    db.query('INSERT INTO employee_role (title) VALUES (?)', role_name, function (err, results) {
        console.log("Role created successfully!")
        console.log(err);
    })
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