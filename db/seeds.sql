INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Human Resources'),
       ('Accounting'),
       ('Administration');

INSERT INTO roles (title, salary, departments_id)
VALUES ('Sales Lead', 100000, 1),
       ('Accountant', 125000, 3),
       ('Lead Engineer', 150000, 2),
       ('Lawyer', 180000, 4),
       ('Hiring Manager', 90000, 5),
       ('Administration manager', 140000, 7),
       ('Salesperson', 80000, 1),
       ('Legal Team Lead', 225000, 4),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ('Mike', 'Chan', 1, 1),
       ('Asheley', 'Rodriguez', 2, 10),
       ('Kevin', 'Tupik', 3, 3),
       ('Kunal', 'Singh', 4, 8),
       ('Malia', 'Brown', 5, 5),
       ('Tom', 'Allen', 6, 6),
       ('Sarah', 'Lourd', 7, 1),
       ('Joshua', 'Rosenberg', 8, 8),
       ('Vanessa', 'Paisley', 9, 3),
       ('Emma', 'Quinn', 10, 10);