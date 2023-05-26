create TABLE employees(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  job_title VARCHAR(255),
  phone_number NUMERIC NOT NULL UNIQUE
);


