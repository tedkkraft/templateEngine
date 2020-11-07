const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Empty array to hold prompt answers
let employees = [];

// Function to add a new manager, which also calls addTeamMembers allowing the user to add more team members after adding the manager first
function addManager(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the team manager's name?",
            name: "name"
        },{
            type: "input",
            message: "What is the manager's ID number?",
            name: "id"
        },{
            type: "input",
            message: "What is the manager's email address?",
            name: "email"
        },{
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber"
        }
    ]).then(function(response) {
        const name = response.name;
        const id = response.id;
        const email = response.email;
        const officeNumber = response.officeNumber;
        const manager = new Manager(name, id, email, officeNumber)
        employees.push(manager)
        addTeamMember();  
    }).catch(function(err) {
        console.log(err)
    });
};

function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Are there more members to add to this team?",
            choices: [
                "Yes, add an engineer.",
                "Yes, add an intern.",
                "No, there are no other members of the team."
            ],
            name: "addNewMember"
        }
    ]).then(function(response) {
        switch (response.addNewMember) {
            case "Yes, add an engineer.":
                addEngineer();
                break;

            case "Yes, add an intern.":
                addIntern();
                break;
            
            case "No, there are no other members of the team.":
                generateTeam();
        }
    }).catch(function(err) {
        console.log(err)
    });
};

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name"
        },{
            type: "input",
            message: "What is the engineer's ID number?",
            name: "id"
        },{
            type: "input",
            message: "What is the engineer's email address?",
            name: "email"
        },{
            type: "input",
            message: "What is the engineer's Github?",
            name: "github"
        },
    ]).then(function(response) {
        const name = response.name;
        const id = response.id;
        const email = response.email;
        const github = response.github;
        const teamMember = new Engineer(name, id, email, github)
        employees.push(teamMember)
        addTeamMember();
    }).catch(function(err) {
        console.log(err)
    });
};

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name"
        },{
            type: "input",
            message: "What is the intern's ID number?",
            name: "id"
        },{
            type: "input",
            message: "What is the intern's email address?",
            name: "email"
        },{
            type: "input",
            message: "What is the intern's school?",
            name: "school"
        }
    ]).then(function(response) {
        const name = response.name;
        const id = response.id;
        const email = response.email;
        const school = response.school;
        const teamMember = new Intern(name, id, email, school)
        employees.push(teamMember)
        addTeamMember();
    }).catch(function(err) {
        console.log(err)
    });
};

function generateTeam() {
     const finishedHtml = render(employees);
    fs.writeFileSync(outputPath, finishedHtml);
};

addManager();
