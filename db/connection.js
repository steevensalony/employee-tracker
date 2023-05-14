const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_tracker'
  },
  console.log(`Connected to database.`)
);

module.exports = db;