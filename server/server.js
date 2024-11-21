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
    database: "world",
    password: "72050h",
    port: 5432,
  });
  db.connect();

let currentUserId = 1; //test value

app.use(cors(corsOptions)); //requests now only accepted from vite server
app.use(bodyParser.urlencoded({ extended: true })); //add body parser to the server
app.use(express.static("public"));

//Get request upon entering localhost:3000

app.get("/test", (req, res) => {
    res.json({ output: ["API Response to Vite."] });
    console.log("/test called");
});

//database request test
async function getCurrentUser() {
    const result = await db.query("SELECT * FROM visited_countries");
    const countries = result.rows;
    const country = countries.find((countries) => countries.id == currentUserId);
    console.log(country.country_code);
    return country.country_code;
}
app.get("/dbTest", async (req, res) => {
    const currentUser = await getCurrentUser();
    res.json({currUser: [currentUser]});
    console.log("/dbTest called");
});



//Listen on Port3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  