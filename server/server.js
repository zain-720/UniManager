import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors"; // To specifiy which url can make requests to the server

const __dirname = dirname(fileURLToPath(import.meta.url)); //get path to curent folder 

const app = express(); 
const port = 3000;

const corsOptions = {origin: ["http://localhost:5173"],}; //vite runs on 5173

app.use(cors(corsOptions)); //requests now only accepted from vite server
app.use(bodyParser.urlencoded({ extended: true })); //add body parser to the server

//Get request upon entering localhost:3000

app.get("/test", (req, res) => {
    res.json({ output: ["API Response to Vite."] });
    console.log("/test called");
});


//Listen on Port3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  