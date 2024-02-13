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

// Function to gather information about the development team members
function gatherTeamInformation() {
  // Prompt for Manager information
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
    .then((managerAnswers) => {
      const manager = new Manager(
        managerAnswers.name,
        managerAnswers.id,
        managerAnswers.email,
        managerAnswers.officeNumber
      );
      teamMembers.push(manager);

      // Continue prompting for team members
      promptTeamMember();
    });
}

// Function to prompt for Engineer or Intern information
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
    .then((roleAnswer) => {
      if (roleAnswer.role === 'Finish') {
        // Generate HTML and write to file
        const htmlContent = render(teamMembers);
        fs.writeFileSync(outputPath, htmlContent, 'utf-8');
        console.log('Team HTML generated successfully!');
      } else if (roleAnswer.role === 'Engineer') {
        promptEngineer();
      } else {
        promptIntern();
      }
    });
}

// Function to prompt for Engineer information
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
    .then((engineerAnswers) => {
      const engineer = new Engineer(
        engineerAnswers.name,
        engineerAnswers.id,
        engineerAnswers.email,
        engineerAnswers.github
      );
      teamMembers.push(engineer);

      // Continue prompting for team members
      promptTeamMember();
    });
}

// Function to prompt for Intern information
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
    .then((internAnswers) => {
      const intern = new Intern(
        internAnswers.name,
        internAnswers.id,
        internAnswers.email,
        internAnswers.school
      );
      teamMembers.push(intern);

      promptTeamMember();
    });
}

gatherTeamInformation();