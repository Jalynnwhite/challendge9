const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate license badge based on the selected license
function renderLicenseBadge(license) {
  // Map license names to badge URLs (customize this based on your needs)
  const licenseBadges = {
    MIT: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    Apache: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    // Add more licenses as needed
  };

  return licenseBadges[license] || '';
}

// Function to generate license link
function renderLicenseLink(license) {
  // Map license names to their respective URLs
  const licenseLinks = {
    MIT: 'https://opensource.org/licenses/MIT',
    Apache: 'https://opensource.org/licenses/Apache-2.0',
    
  };

  return licenseLinks[license] || '';
}

// Function to generate license section of README
function renderLicenseSection(license) {
  if (license) {
    return `## License

This project is licensed under the [${license} License](${renderLicenseLink(license)}).`;
  }
  return '';
}

// Function to generate markdown for README
function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);

  return `# ${data.title}

${licenseBadge}

## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

## Contributing

${data.contributing}

## Tests

${data.tests}

${renderLicenseSection(data.license)}

## Questions

For any questions, please contact me:

`;
}

// Use Inquirer to prompt the user for input
inquirer
  .prompt([
    
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
    
  ])
  .then((answers) => {
    // Generate markdown using user input
    const markdown = generateMarkdown(answers);

    // Write the generated markdown to a README.md file
    fs.writeFileSync('README.md', markdown);

    console.log('README.md has been successfully generated!');
  })
  .catch((error) => console.error(error));
