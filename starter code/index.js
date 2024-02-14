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
      // Add prompts for manager details
    ])
    .then((answers) => {
      const manager = new Manager(/* Pass manager details from answers */);
      teamMembers.push(manager);
      promptTeamMember();
    });
}

// Function to prompt user for team member details
function promptTeamMember() {
  inquirer
    .prompt([
      // Add prompt for selecting role or finishing
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
      // Add prompts for engineer details
    ])
    .then((answers) => {
      const engineer = new Engineer(/* Pass engineer details from answers */);
      teamMembers.push(engineer);
      promptTeamMember();
    });
}

// Function to prompt user for intern details
function promptIntern() {
  inquirer
    .prompt([
      // Add prompts for intern details
    ])
    .then((answers) => {
      const intern = new Intern(/* Pass intern details from answers */);
      teamMembers.push(intern);
      promptTeamMember();
    });
}

// Start by prompting for the manager
promptManager();