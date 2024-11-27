README 

App Installation steps

1. npm package setup
  a. cd to server then do (npm install)
  b. cd to uni-manager then do (npm install)

2. PostgreSQL database setup

  a. Install PostgreSQL version 15, do not change anything from what the default isntallation has, remember your password
  b. Open up pgAdmin4 then right click on Databases and create a new database called "uni-management", keep everything else to default settings
  c. Open the uni management databased, left click on Schemas then left click on tables.
  d. Create a new table by ethier manually or by right clicking tables then left clicking create table, create these following tables  
  
    make table of the name "login_table" :
    CREATE TABLE login_data(
      id SERIAL PRIMARY KEY,
      username TEXT UNQIUE NOT NULL,
      password TEXT NOT NULL
    );
  
  e. 

3. Internal setup process

  a. Within server/server.js edit the information given to create the db connection, change the password to whatever you choose as your PostgreSQL password


App Usage Guide

 1. Create user process


 2. Login process


 3. Home page functionality 



Component Contruction Documentation
