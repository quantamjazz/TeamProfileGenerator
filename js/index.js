const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const render = require('./render'); 

const teamMembers = [];

// Function to prompt the user for information about a manager
function promptManager() {
  inquirer.prompt([
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
  ]).then((answers) => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    promptTeamMember();
  });
}

// Function to prompt the user for information about an engineer or intern
function promptTeamMember() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Select the team member\'s role:',
      choices: ['Engineer', 'Intern', 'Finish'], // Add a 'Finish' option
    },
  ]).then((answers) => {
    if (answers.role === 'Engineer') {
      promptEngineer();
    } else if (answers.role === 'Intern') {
      promptIntern();
    } else {
      // User selected 'Finish', generate HTML and write to file
      const htmlContent = render(teamMembers);
      fs.writeFileSync('./output/team.html', htmlContent, 'utf-8');
      console.log('Team HTML generated successfully!');
    }
  });
}

// Function to prompt the user for information about an engineer
function promptEngineer() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the engineer\'s name:',
    },
    // Repeat similar prompts for id, email, and GitHub username
    // ...

  ]).then((answers) => {
    const engineer = new Engineer(answers.name, /*...*/);
    teamMembers.push(engineer);
    // After adding the engineer, prompt for the next team member
    promptTeamMember();
  });
}

// Function to prompt the user for information about an intern
function promptIntern() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the intern\'s name:',
    },
    // Repeat similar prompts for id, email, and school
    // ...

  ]).then((answers) => {
    const intern = new Intern(answers.name, /*...*/);
    teamMembers.push(intern);
    // After adding the intern, prompt for the next team member
    promptTeamMember();
  });
}

// Start the process by prompting for the manager
promptManager();
