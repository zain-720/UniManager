import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import cors from "cors"; // To specifiy which url can make requests to the server

const __dirname = dirname(fileURLToPath(import.meta.url)); //get path to curent folder 

const app = express(); 
const port = 3000;

const corsOptions = {origin: ["http://localhost:5173"],}; //vite runs on 5173

//User inputs whatever their password is for their postgres
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "uni-management",
    password: "72050h",
    port: 5432,
});
db.connect();

app.use(cors(corsOptions)); //requests now only accepted from vite server
app.use(bodyParser.json()); //parse incoming JSON bodies 
app.use(bodyParser.urlencoded({ extended: true })); //add body parser to the server
app.use(express.static("public"));

//Get request for finding if the user has entered valid credentials 
app.get('/requestLogin', async (req, res) => {  
    try{
        const { username , password } = req.query;
        const result = await db.query('SELECT * FROM login_data WHERE username = $1 AND password = $2', [username, password]);
        //retrun true or false depending on if user entered correctly or not
        if ((result.rows).length > 0) {
            console.log('User found');
            res.json({output: true});
        } else {
            console.log('No user found');
            res.json({output: false});
        } 
    }
    catch(err) {
        console.error(err)
    }
});

//Post request to try to create a new user 
app.post("/requestCreation", async (req, res) => {
    try{
        const { username, password } = req.body;

        // Check if the username already exists (do this to avoid an extra id being wasted)
        const checkUser = await db.query(
            'SELECT * FROM login_data WHERE username = $1',
            [username]
        );

        // If username is unqiue add the user if not return output of false
        if (checkUser.rows.length > 0) {
            res.json({output: false});
        }
        else{
            const result = await db.query("INSERT INTO login_data (username, password) VALUES ($1, $2) RETURNING *;", [username, password]);
            res.json({output: true});
        }
    }    
    catch(err){
        if(err.code === '23505'){
            console.error(err)
            console.error("Same username attempted to add to the table")
        }
        else{
            console.error(err)
        }
    }
});

//Listen on Port3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  