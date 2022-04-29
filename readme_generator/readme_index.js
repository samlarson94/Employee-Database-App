// Include packages needed for this application
// === Note: Make sure to install initializer using "npm i" command in terminal ===

const fs = require("fs");
var inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of this project?",
  },
  {
    type: "input",
    name: "motivation",
    message: "What was your motivation for this project?",
  },
  {
    type: "input",
    name: "problem",
    message: "What problem does this project solve?",
  },
  {
    type: "input",
    name: "learnings",
    message: "what did you learn from this project?",
  },
  {
    type: "input",
    name: "steps",
    message: "What does someone need to install this project?",
  },
  {
    type: "input",
    name: "usage",
    message: "How does someone use this project?",
  },
  {
    type: "list",
    name: "license",
    message:"what licenses and/or third-party assets were used while building this project?",
    choices: ['MIT', 'Apache License 2.0', 'BSD', 'GPL', 'Mozilla', 'GNU', 'none'],
    default: ['MIT']
  },
  {
    type: "input",
    name: "contribute",
    message: "How can one contribute to this project?",
  },
  {
    type: "input",
    name: "credits",
    message: "Was there anyone in particular that helped with this project?",
  },
  {
    type: "input",
    name: "username",
    message: "What is your github username?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?"
  },
  {
    type: "input",
    name: "tests",
    message: "What tests did you run for this application?"
  }
];

// Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

//Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      // Call generate markdown function and pass in answers
      var markdown = generateMarkdown(answers);
      writeToFile("./output/README.md", markdown);
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

// Function call to initialize app
init();