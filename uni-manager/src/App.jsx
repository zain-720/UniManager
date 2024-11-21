import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from "axios";

function App() {
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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <button onClick={handleBDClick}>Send request to DB</button>
        <h4>{dbResult}</h4>
      </div>
      <h3>{serverTest}</h3>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
