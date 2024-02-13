const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const render = require('./render'); 

// Your logic for gathering user input and building the team will go here

const manager = new Manager('John Manager', 'M123', 'john@company.com', '123');
const engineer = new Engineer('Jane Engineer', 'E456', 'jane@company.com', 'janeGitHub');
const intern = new Intern('Bob Intern', 'I789', 'bob@company.com', 'University of Code');

// Render HTML and write to file
const teamMembers = [manager, engineer, intern];
const htmlContent = render(teamMembers);

fs.writeFileSync('./output/team.html', htmlContent, 'utf-8');
