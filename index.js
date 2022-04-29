const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

const { allDepts, allRoles, allEmployees, addDepartment, addRole, addEmployee, getAllRoles, getAllEmployees } = require('./queryFunctions')

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
            // console.log(ans);
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
    
   
    getAllRoles((err, role_data) => {
        let roles = role_data.map(role => role.title);
        console.log(role_data);
       
   
    getAllEmployees((err, employee_data) => {
        let employees = employee_data.map(employee => employee.first_name + " " + employee.last_name);
        console.log(employee_data);

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
                message: "What is the employee's role?",
                choices: roles 
            },
            {
                type: "list",
                name: "employee_manager",
                message: "Who is this employee's manager?",
                choices: employees
            }]
            
        )
        .then((ans) => {
            var role_id = role_data.reduce((acc, role) => {
                if (role.title === ans.role_id) {
                    return role.id;
                }else{
                    return acc;
                }
            },0);

            var manager_id = employee_data.reduce((acc, employee) => {
                console.log(employee);
                console.log(ans.employee_manager);
                if (employee.first_name + " " + employee.last_name === ans.employee_manager) {
                    console.log("true");
                    return employee.id;
                }else{
                    return acc;
                }
            },0)
            console.log(manager_id);
            addEmployee(ans.employee_first, ans.employee_last, role_id, manager_id);
            startApp();
        })

    })

});

   
}


startApp();