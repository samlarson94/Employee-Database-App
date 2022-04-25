const db = require('./connection')
const cTable = require('console.table');
function allDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        // startApp();
    });
}

function allRoles() {
    db.query('SELECT * FROM employee_role', function (err, results) {
        console.table(results);
    });
}

function addDepartment(dept_name) {
    db.query('INSERT INTO department (dept_name) VALUES (?)', dept_name, function (err, results) {
        console.log("Department created successfully!")
        console.log(err);
    })
}

module.exports = {
    allDepts,
    allRoles,
    addDepartment
    
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