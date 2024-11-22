import React, { useState, useEffect } from 'react';
//import './App.css';
import axios from "axios";

function AppTester() {
  const [count, setCount] = useState(0);
  const [serverTest, serverTestFunc] = useState("");
  const [dbResult, resultUpdate] = useState("");
  const serverURL = "http://localhost:3000";

  // Single use async func to get server infromation
  const result = async () => {
    const response = await axios.get(serverURL + "/test");
    console.log(response.data.output)
    serverTestFunc(response.data.output)
  } 

  //Auto run the single use function 
  useEffect( () => {
    result();
  }, []);

  //Handle button click, send get request, which will call to db
  async function handleBDClick(){
    const response = await axios.get(serverURL + "/dbTest");
    console.log(response.data.output);
    resultUpdate(response.data.currUser);
  }

  return (
    <div>
      <h1>Hi</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        <button onClick={handleBDClick}>Send request to DB</button>
        <h4>{dbResult}</h4>
      </div>
      <h3>{serverTest}</h3>
    </div>
  )
}

export default AppTester
