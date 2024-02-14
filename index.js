// Importing necessary modules and classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Output directory and file path for team HTML
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function for generating HTML
const render = require("./src/page-template.js");

// Initializing variables for team members
let manager;
let intern;
let engineer;

// Empty array to store newly created team members
const teamMembers = [];

// Inquirer questions for manager details
const managerQuestions = [
  { type: "input", message: "Name:", name: "name" },
  { type: "input", message: "ID:", name: "id" },
  { type: "input", message: "Email address:", name: "email" },
  { type: "input", message: "Office Number:", name: "office" },
];

// Menu after manager creation
const postManagerMenu = [
  {
    type: "list",
    message: "What would you like to do now?",
    name: "postManagerMenu",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  },
];

// Inquirer questions for engineer details
const engineerQuestions = [
  { type: "input", message: "Name:", name: "name" },
  { type: "input", message: "ID:", name: "id" },
  { type: "input", message: "Email:", name: "email" },
  { type: "input", message: "GitHub username:", name: "github" },
];

// Inquirer questions for intern details
const internQuestions = [
  { type: "input", message: "Name:", name: "name" },
  { type: "input", message: "ID:", name: "id" },
  { type: "input", message: "Email:", name: "email" },
  { type: "input", message: "School:", name: "school" },
];

// Function to prompt manager questions
function promptManagerQuestions() {
  console.log(
    "Hello. Please input the following details for the manager of the team."
  );
  inquirer
    .prompt(managerQuestions)
    .then((data) => createManager(data))
    .then(() => promptMenuQuestions());
}

// Function to create manager and push to the team array
function createManager(data) {
  const manager = new Manager(data.name, data.id, data.email, data.office);
  teamMembers.push(manager);
}

// Function to prompt menu questions after each new team member is created
function promptMenuQuestions() {
  inquirer.prompt(postManagerMenu).then((data) => menuResponse(data));
}

// Function to handle user response to menu options
function menuResponse(data) {
  let response = data.postManagerMenu;
  console.log(`You have chosen to ${response}`);
  if (response === "Add an engineer") {
    promptEngineerQuestions();
  } else if (response === "Add an intern") {
    promptInternQuestions();
  } else if (response === "Finish building the team") {
    generateHTML();
  }
}

// Function to prompt engineer questions
function promptEngineerQuestions() {
  inquirer
    .prompt(engineerQuestions)
    .then((data) => createEngineer(data))
    .then(() => promptMenuQuestions());
}

// Function to create engineer and push to the team array
function createEngineer(data) {
  const engineer = new Engineer(data.name, data.id, data.email, data.github);
  teamMembers.push(engineer);
}

// Function to prompt intern questions
function promptInternQuestions() {
  inquirer
    .prompt(internQuestions)
    .then((data) => createIntern(data))
    .then(() => promptMenuQuestions());
}

// Function to create intern and push to the team array
function createIntern(data) {
  const intern = new Intern(data.name, data.id, data.email, data.school);
  teamMembers.push(intern);
}

// Function to generate HTML and write it to the file
function generateHTML() {
  let team = render(teamMembers);

  if (outputPath) {
    fs.writeFile(outputPath, team, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Team created!");
      }
    });
  }
}

// Starting the code execution
promptManagerQuestions();
