const express = require('express');
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request
app.use((req, res) => {
  res.status(404).end();
});

// Connect to server to start
db.connect(err => {
  if (err) throw err;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

const questions = [
  {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Delete Department', 'Delete Role', 'Delete Employee']
  }
]

function init() {
  inquirer.prompt(questions)
  .then(answer => {
    switch (answer.menu) {
      case 'View All Departments':
          viewDepartments();
          break;
      case 'View All Roles':
          viewRoles();
          break;
      case 'View All Employees':
          viewEmployees();
          break;
      case 'Add a Department':
          addDepartment();
          break;
      case 'Add a Role':
          addRole();
          break;
      case 'Add an Employee':
          addEmployee();
          break;
      case 'Update an Employee Role':
          updateEmployeeRole();
          break;
      case 'Delete Department':
          deleteDepartment();
          break;
      case 'Delete Role':
          deleteRole();
          break;
      case 'Delete Employee':
          deleteEmployee();
          break;
    }
  })
}

init();

const viewDepartments = () => {
  const sql = 'SELECT * FROM employee_tracker.departments';
  db.query(sql, (err, data) => {
    if (err) {
      res.status(500).json( { error: err.message });
        return;
    }
    console.table(data);
    init();
  });
}

const viewRoles = () => {
  const sql = `SELECT roles.id, 
              roles.title, 
              departments.name AS department 
              FROM roles 
              INNER JOIN departments 
              ON roles.departments_id = departments.id`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  })
};