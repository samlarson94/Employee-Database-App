const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

const { allDepts, allRoles, allEmployees, addDepartment, addRole, addEmployee } = require('./queryFunctions')

const opt = ["ALL_DEPT", "ALL_ROLES", "ALL_EMPLOYEES", "ADD_DEPARTMENT", "ADD_ROLE", "ADD_EMPLOYEE"];
function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "userview",
            message: "What you like to do?",
            choices: opt
        }
    ])
        .then((ans) => {
            console.log(ans);
            switch (ans.userview) {
                case opt[0]:
                    allDepartments();
                    break;
                case opt[1]:
                    viewAllRoles();
                    break;
                case opt[2]:
                    viewAllEmployees();
                    break;
                case opt[3]:
                    createDepartment();
                    break;
                case opt[4]:
                    createRole();
                    break;
                case opt[5]:
                    createEmployee();
                default:
                    break;
            }
        })
}

function allDepartments () {
    allDepts();
    startApp();
};

function viewAllRoles () {
    allRoles();
    startApp();
};

function viewAllEmployees () {
    allEmployees();
    startApp();
};



function createDepartment () {
    inquirer.prompt(
        [{
            type:"input",
            name:"department_name",
            message:"What is the name of the department?"
        },
        {
            type:"input",
            name: "department_id_num",
            message: "What is the id number of the department?"

        }]

    )
    .then((ans) => {
        console.log(ans);
        addDepartment(ans.department_name);
        startApp();
    })
}

function createRole () { 
    inquirer.prompt(
        [{
            type: "input",
            name: "role_id",
            message: "What is the id number for this role?"
        },
        {
            type: "input",
            name: "dept_id",
            message: "What is the Department id for this role?"
        },
        {
            type: "input",
            name: "role_name",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "role_salary",
            message: "What is the salary for this role?"
        }],
        
    )
    .then((ans) => {
        console.log(ans);
        addRole(ans.role_id, ans.role_name, ans.role_salary, ans.dept_id);
        startApp();
    })
};

function createEmployee () { 
    inquirer.prompt(
        [{
            type: "input",
            name: "employee_first",
            message: "What is the employee's first name?"
        },{
            type: "input",
            name: "employee_last",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role id?",
            choices: [] //Push choices from employee_role table
        },
        {
            type: "list",
            name: "employee_manager",
            message: "Who is this employee's manager?",
            choices: [] //Push choices from employee table
        }]
        
    )
    .then((ans) => {
        console.log(ans);
        addEmployee(ans.employee_first, ans.employee_last, ans.role_id, ans.employee_manager);
        startApp();
    })
}




startApp();