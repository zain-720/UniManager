README 

App Installation steps

1. npm package setup
  a. cd to server then do (npm install)
  b. cd to uni-manager then do (npm install)

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

    make table of the name todolist_data :
    CREATE TABLE todolist_data (
      id INTEGER PRIMARY KEY REFERENCES login_data(id),
      username TEXT REFERENCES login_data(username),
      items JSONB[],
      key_number INTEGER
    );

    Create a Trigger Function to auto update todolist-data table when a new item is added :
    CREATE FUNCTION create_todolist_data()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO todolist_data (id, username, items, key_number)
        VALUES (NEW.id, NEW.username, ARRAY[]::JSONB[], 0);
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER after_login_insert2
        AFTER INSERT ON login_data
        FOR EACH ROW
        EXECUTE FUNCTION create_todolist_data(); 

3. Internal setup process

  a. Within server/server.js edit the information given to create the db connection, change the password to whatever you choose as your PostgreSQL password

App Usage Guide

 0. Starting the app
    To run server and webpage do (npm run dev) on directory server and uni-manager to start the server and the react app

 1. Create user process
  To create a user it must have a unqiue username associated with it, password must be entered twice and needs to match to be accepted

 2. Login process
  Login process is simple just enter a created users username and password to enter into the hompage

 3. Home page functionality 
  Is a hub for all the apps current main features listed below

  a. Note Taker 
    Has the ability to create notes, edit them, and delete them while also storing all of them.<br>
    - In cases where two users are using note taker on the same account at the same time Note Taker will update whenever an action is performed (adding, saving, deleting, reloading). If one user deletes a note but another user edits and saves that same note, that note is added back in its new edited state <br>

  b. Todo List 
    Function with the ability to store todo messages in a list ordered by closest todo to current date, inputed from the todo list app.<br>
     - In cases where two users are using todo list on the same account at the same time Todo List will update whenever an action is performed (adding, editing, deleting, reloading). If one user deletes an item but another user edits and saves that same item, that item is added back in its new edited state. <br>
     - However for checking off a box for an item which was deleted by a user on the same account, that item will still be deleted.<br>
     - List items cannot be edited while checked off as complete <br>

Component Contruction Documentation

  App :

  ProtectedRoute:

  Login:

  CreateUser:

  HomePage:

    NoteTaker:

    TodoList:


App Database Table Strucutures

1. login_data : id, username, password 

2. note_data : referenced from login_data(id, username), noteArray[{key, title, content}], key_number 

3. todolist_data : referenced from login_data(id, username), items[{key, item, due_date, completed}], key_number
