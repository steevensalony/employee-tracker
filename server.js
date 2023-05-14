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

const viewEmployees = () => {
  const sql = `SELECT employees.id, 
              employees.first_name, 
              employees.last_name, 
              roles.title AS title,
              departments.name AS department, 
              roles.salary, 
              CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
              FROM employees 
              LEFT JOIN roles ON employees.roles_id = roles.id 
              LEFT JOIN departments ON roles.departments_id = departments.id 
              LEFT JOIN employees AS manager ON employees.manager_id = manager.id 
              ORDER By employees.id`;
  db.query(sql, (err, data) => {
    if (err) throw err; 
    console.table(data);
    init();
  });
}

const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the name of the department you wish to add?'
    }
  ])
  .then((answer) => {
    const sql = 'INSERT INTO departments (name) VALUES (?)';
    const nameOfDepartment = [answer.name];
    db.query(sql, nameOfDepartment, (err, data) => {
      console.log(data)
      if (err) throw err;
      console.log('Department has been added to database!')

      db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
          res.status(500).json({ error: err.message })
          return;
        }
        console.table(data);
        init();
      })
       
    })
  })
}

const addRole = () => {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'What is the title of this role?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary of this role?'
    },
    {
      name: 'departments_id',
      type: 'number',
      message: 'What is the department id for this role?'
    }
  ])
  .then((res) => {
    const sql = 'INSERT INTO roles (title, salary, departments_id) VALUES (?, ?, ?)';
    const titleOfRole = [res.title, res.salary, res.departments_id];
    db.query(sql, titleOfRole, (err, data) => {
      console.log(data);
      if (err) throw err;
      console.log('Roles has been added to database!');

      db.query('SELECT * FROM roles', (err, data) => {
        if (err) {
          res.status(500).json({ error: err.message })
          init()
        }
        console.table(data);
      init()
      })
    })
  })
}

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'What is the first name of the employee?'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'What is the last name of the employee?'
    },
    {
      name: 'roles_id',
      type: 'input',
      message: 'What is role id is associated with this employee??'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'What is the manaager id associated with this employee?'
    }
  ]).then(function (response) {
    db.query('INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)', [response.first_name, response.last_name, response.roles_id, response.manager_id], function (err, data) {
      if (err) throw err;
      console.log('New employee has been added.');

      db.query('SELECT * FROM employees', (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message })
          init()
        }
        console.table(result);
        init()
      })
    })
  })
}

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'What is the first name of the employee you wish to update?'
    },
    {
      name: 'manager_id',
      type: 'number',
      message: 'What is the manager id for that employee?'
    }
  ]).then(function(response) {
    db.query('UPDATE employees SET manager_id = ? WHERE first_name = ?', [response.manager_id, response.first_name], function (err, data) {
      if (err) throw err;
      console.log('Employee updated');

      db.query('SELECT * FROM employees', (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message })
          init()
        }
        console.table(result);
        init()
      })
    })
  })
}