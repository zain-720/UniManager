import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import Welcome from './Components/LoginComponents/WelcomeScreen';
import Login from './Components/LoginComponents/Login';
import CreateUser from './Components/LoginComponents/CreateAccount';

//import './App.css';
import axios from "axios";
const serverURL = "http://localhost:3000";

function App() {
  const [count, setCount] = useState(0);
  const [serverTest, serverTestFunc] = useState("");
  const [dbResult, resultUpdate] = useState("");
  

  //Setup route connections between pages.
  

  return (
    <>
        <Router 
        future={{
        v7_relativeSplatPath: true, // * routing works better
        v7_startTransition: true, //transition better
        }}>
            <Routes>

                <Route path="/" element={<Welcome />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/create-account" element={<CreateUser />}/>

            </Routes>
        </Router>
    </>
  );
}

export default App
export {serverURL}