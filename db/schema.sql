DROP DATABASE IF EXISTS CodeHire;

CREATE DATABASE code_hire;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS company_schedule;
DROP TABLE IF EXISTS user_schedule;
DROP TABLE IF EXISTS all_challenges;
DROP TABLE IF EXISTS initial_challenges;
DROP TABLE IF EXISTS results;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR (30) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  phone VARCHAR(20) NULL UNIQUE,
  fullName VARCHAR(30) NULL
)

CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  companyName VARCHAR(30) NOT NULL UNIQUE, 
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL,
  email VARCHAR(50) NULL UNIQUE,
  phone VARCHAR(20) NULL,
  information VARCHAR(255) NULL,
  logoURL VARCHAR(255) NULL
)

CREATE TABLE all_challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL UNIQUE,
  details VARCHAR(255) NOT NULL,
  timelimit TIME NOT NULL,
  company_id SMALLINT REFERENCES companies(id)
)

CREATE TABLE company_schedule (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  challenge_id SMALLINT REFERENCES all_challenges(id),
  company_id SMALLINT REFERENCES companies(id)
)

CREATE TABLE user_schedule (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  user_id SMALLINT REFERENCES users(id),
  challenge_id SMALLINT REFERENCES all_challenges(id),
  company_id SMALLINT REFERENCES companies(id)
)

CREATE TABLE initial_challenges (
  id SERIAL PRIMARY KEY,
  challenge_id SMALLINT REFERENCES all_challenges(id),
  company_id SMALLINT REFERENCES companies(id)
)


CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  userPassed BOOLEAN NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  challenge_id SMALLINT REFERENCES all_challenges(id),
  user_id SMALLINT REFERENCES users(id),
  company_id SMALLINT REFERENCES companies(id)
)

INSERT INTO companies (companyName, username, password, email) VALUES ('admin', 'admin', 'password', 'klingon@gmail.com');
