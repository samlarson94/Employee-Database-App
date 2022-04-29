INSERT INTO department(dept_name) VALUES ('Sales');
INSERT INTO department(dept_name) VALUES ('Accounting');


INSERT INTO employee_role(title, salary, dept_id)
 VALUES ('Sales Associate', '50000', 1);

INSERT INTO employees(id, first_name, last_name, role_id, manager_id)
 VALUES (1, 'Mr', 'Boss', 1, 1);
