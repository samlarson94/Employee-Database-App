const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

const { allDepts,
        allRoles,
        allEmployees,
        addDepartment,
        addRole,
        addEmployee,
        getAllRoles,
        getAllEmployees,
        getAllDepartments,
        removeEmployee,
        removeRole,
        removeDepartment} = require('./queryFunctions')

const opt = [
    "VIEW ALL DEPARTMENTS",
    "VIEW ALL ROLES",
    "VIEW ALL EMPLOYEES",
    "ADD DEPARTMENT", 
    "ADD ROLE",
    "ADD EMPLOYEE",
    "REMOVE DEPARTMENT",
    "REMOVE ROLE",
    "REMOVE EMPLOYEE",
    "---- EXIT APP ----"
];

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
                case opt[6]:
                    deleteDepartment();
                    break;
                case opt[7]:
                    deleteRole();
                    break;
                case opt[8]:
                    deleteEmployee();
                    break;
                case opt[9]:
                    leaveApp();
                    break;
                default:
                    break;
            }
        })
}

// VIEW-ONLY QUERIES
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


//ADD DEPARTMENT TO DATABASE
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

//ADD ROLE TO DATABASE
function createRole () { 
   
    getAllDepartments((err, dept_data) => {
        let departments = dept_data.map(dept => dept.dept_name);

    inquirer.prompt(
        [{
            type: "list",
            name: "dept_id",
            message: "Which department does this role belong to?", 
            choices: departments
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
        var dept_id = dept_data.reduce((acc, dept) => {
            if (dept.dept_name === ans.dept_id) {
                return dept.id;
            }else{
                return acc;
            }
        },0);

        addRole(ans.role_id, ans.role_name, ans.role_salary, dept_id);
        startApp();
    })
});
}

//ADD EMPLOYEE TO DATABASE
function createEmployee () { 

    //The following functions bring data in from db query functions and map them into an empty an empty array.  
        //These variables are used below for choice-based prompts.
    getAllRoles((err, role_data) => {
        let roles = role_data.map(role => role.title);
       
   
    getAllEmployees((err, employee_data) => {
        let employees = employee_data.map(employee => employee.first_name + " " + employee.last_name);

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
                if (employee.first_name + " " + employee.last_name === ans.employee_manager) {
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

//DELETE DEPT
function deleteDepartment() {

getAllDepartments((err, dept_data) => {
     let departments = dept_data.map(dept => dept.dept_name);

     inquirer.prompt(
        [{
            type: "list",
            name: "dept_delete",
            message: "Which department do you wish to delete?",
            choices: departments
        }],
     )
    //  .then((ans) => {
    //     var dept_id = dept_data.reduce((acc, dept) => {
    //         if (dept.dept_name === ans.dept_id) {
    //             console.log(dept_id);
    //             return dept.id;
    //         }else{
    //             return acc;
    //         }
    //     },0);
    .then((ans) => {
        console.log(ans);
        removeDepartment(ans.dept_id);
        startApp();
    })

    //     removeDepartment(dept_id);
    //     startApp();
    // })
})}

//DELETE ROLE
function deleteRole() {

}

//DELETE EMPLOYEE
function deleteEmployee() {

}

function leaveApp() {
    console.log("Good Bye!");
}

startApp();