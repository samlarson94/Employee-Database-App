const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

const { allDepts, allRoles, allEmployees, addDepartment, addRole } = require('./queryFunctions')

const opt = ["ALL_DEPT", "ALL_ROLES", "ALL_EMPLOYEES", "ADD_DEPARTMENT", "ADD_ROLE"];
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
                    // queryFunctions.allDepts();
                    allDepts();
                    break;
                case opt[1]:
                    allRoles();
                    break;
                case opt[2]:
                    allEmployees();
                    break;
                case opt[3]:
                    createDepartment();
                    break;
                case opt[4]:
                    createRole();
                default:
                    break;
            }
        })
}

function createDepartment () {
    inquirer.prompt(
        {
            type:"input",
            name:"department_name",
            message:"What is the name of the department?"
        },

    )
    .then((ans) => {
        console.log(ans);
        addDepartment(ans.department_name);
        startApp();
    })
}

function createRole () { 
    inquirer.prompt(
        {
            type: "input",
            name: "role_name",
            message: "What is the name of the role?"
        },
        // {
        //     type: "list",
        //     name: "department_name",
        //     message: "Which Department does the role belong to?",
        //     choices: ['Accounting', 'Legal']
        // },
    )
    .then((ans) => {
        console.log(ans);
        addRole(ans.role_name);
        // addDepartment(ans.department_name);
        startApp();
    })
}

startApp();