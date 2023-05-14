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