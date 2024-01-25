
const inquirer = require('inquirer');
const fs = require('fs');


const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of your project:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache', 'None'],
  },
  {
    type: 'input',
    name: 'installation',
    message: 'what are steps required to install your project:',
  },
  
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data);
  console.log(`File "${fileName}" has been successfully written.`);
}

// TODO: Create a function to initialize app
function init() {
  // Use Inquirer to prompt the user for input
  inquirer
    .prompt(questions)
    .then((answers) => {
      // Generate markdown using user input
      const markdown = generateMarkdown(answers);

      
      writeToFile('README.md', markdown);
    })
    .catch((error) => console.error(error));
}

const { renderLicenseBadge } = require('./utils/generateMarkdown');


// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
    const licenseBadge = renderLicenseBadge(data.license);
  
  return `# ${data.title}\n\n${renderLicenseBadge(data.license)}\n\n## Description\n\n${data.description}\n\n${renderLicenseSection(data.license)}`;
}

// Function call to initialize app
init();
