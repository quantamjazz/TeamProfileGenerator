const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

// Function to prompt user for manager details
function promptManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the manager\'s name:',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter the manager\'s employee ID:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter the manager\'s email:',
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'Enter the manager\'s office number:',
      },
    ])
    .then((answers) => {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      teamMembers.push(manager);
      promptTeamMember();
    });
}

// Function to prompt user for team member details
function promptTeamMember() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Select the team member\'s role:',
        choices: ['Engineer', 'Intern', 'Finish'],
      },
    ])
    .then((answers) => {
      if (answers.role === "Engineer") {
        promptEngineer();
      } else if (answers.role === "Intern") {
        promptIntern();
      } else {
        // Finish and generate HTML
        const htmlContent = render(teamMembers);
        fs.writeFileSync(outputPath, htmlContent, "utf-8");
        console.log("Team HTML generated successfully!");
      }
    });
}

// Function to prompt user for engineer details
function promptEngineer() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the engineer\'s name:',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter the engineer\'s employee ID:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter the engineer\'s email:',
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter the engineer\'s GitHub username:',
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      teamMembers.push(engineer);
      promptTeamMember();
    });
}

// Function to prompt user for intern details
function promptIntern() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the intern\'s name:',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter the intern\'s employee ID:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter the intern\'s email:',
      },
      {
        type: 'input',
        name: 'school',
        message: 'Enter the intern\'s school:',
      },
    ])
    .then((answers) => {
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      teamMembers.push(intern);
      promptTeamMember();
    });
}

// Start by prompting for the manager
promptManager();