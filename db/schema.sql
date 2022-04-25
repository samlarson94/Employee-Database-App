DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10,2),
dept_id INT NOT NULL,
FOREIGN KEY (dept_id) REFERENCES department(id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES employee_role(id)
);
