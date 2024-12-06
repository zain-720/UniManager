README 

App Installation steps

1. npm package setup
  a. cd to server then do (npm install)
  b. cd to uni-manager then do (npm install)
  c. To run server and webpage do npm run dev on directory server and uni-manager

2. PostgreSQL database setup

  a. Install PostgreSQL version 15, do not change anything from what the default isntallation has, remember your password
  b. Open up pgAdmin4 then right click on Databases and create a new database called "uni-management", keep everything else to default settings
  c. Open the uni management databased, left click on Schemas then left click on tables.
  d. Create a new table by ethier manually or by right clicking tables then left clicking create table, create these following tables and setups  
  
    make table of the name "login_table" :
    CREATE TABLE login_data(
      id SERIAL PRIMARY KEY,
      username TEXT UNQIUE NOT NULL,
      password TEXT NOT NULL
    );

    make table of the name note_data :
    CREATE TABLE note_data (
      id INTEGER PRIMARY KEY REFERENCES login_data(id),
      username TEXT REFERENCES login_data(username),
      notes JSONB[],
      key_number INTEGER
    );

    Create a Trigger Function to auto update note-data table when a new user is added :
    CREATE FUNCTION create_note_data()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO note_data (id, username, notes, key_number)
        VALUES (NEW.id, NEW.username, ARRAY[]::JSONB[], 0);
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER after_login_insert
        AFTER INSERT ON login_data
        FOR EACH ROW
        EXECUTE FUNCTION create_note_data();
      
  e. 

3. Internal setup process

  a. Within server/server.js edit the information given to create the db connection, change the password to whatever you choose as your PostgreSQL password


App Usage Guide

 1. Create user process


 2. Login process


 3. Home page functionality 



Component Contruction Documentation





App Database Table Strucutures


1. login_data : id, username, password 

2. note_data : referenced from login_data(id, username), noteArray[{key, title, content},key_number,]
