const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

const { allDepts, allRoles, addDepartment } = require('./queryFunctions')

const opt = ["ALL_DEPT", "ALL_ROLES", "ALL_EMPLOYEES", "ADD_DEPARTMENT"];
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
                case opt[3]:
                    createDepartment();
                    break;
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

startApp();