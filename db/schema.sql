DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) 
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  departments_id INT,
  FOREIGN KEY (departments_id) 
  REFERENCES departments(id) 
  ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  roles_id INT,
  manager_id INT,
  FOREIGN KEY (roles_id) 
  REFERENCES roles(id) 
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id) 
  REFERENCES employees(id) 
  ON DELETE SET NULL
);