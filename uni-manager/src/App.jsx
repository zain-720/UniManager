import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import Welcome from './Components/LoginComponents/WelcomeScreen';
import Login from './Components/LoginComponents/Login';
import CreateUser from './Components/CreateAccountComponenets/CreateAccount';
import HomePage from './Components/HomePageComponents/HomePage';

//import './App.css';
import axios from "axios";
const serverURL = "http://localhost:3000";

// Login authentication state
const [isAuthenticated, setIsAuthenticated] = useState(false);
const login = () => setIsAuthenticated(true);
const logout = () => setIsAuthenticated(false);




function App() {
  const [count, setCount] = useState(0);
  const [serverTest, serverTestFunc] = useState("");
  const [dbResult, resultUpdate] = useState("");
  

  //Setup route connections between pages.

  //Protection of pages with login
  const ProtectedRoute = (isAuthenticated) => {
    return isAuthenticated ? <Navigate to="/home-page" /> : <Navigate to="/" />;
  };
  
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
                <Route path="/home-page" element={ProtectedRoute(isAuthenticated)}/>

            </Routes>
        </Router>
    </>
  );
}

export default App
export {serverURL, login, logout}