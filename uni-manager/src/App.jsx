import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Welcome from './Components/WelcomePageComponents/WelcomeScreen';
import Login from './Components/LoginComponents/Login';
import CreateUser from './Components/CreateAccountComponenets/CreateAccount';
import HomePage from './Components/HomePageComponents/HomePage';
import ProtectedRoute from './Components/Ultilities/ProtectedRoute';
import HandleLoggedOut from './Components/Ultilities/HandleLoggedOut';
import NoteTaker from './Components/HomePageComponents/NoteTaker';
import TodoList from './Components/HomePageComponents/TodoList';

//import './App.css';
import axios from "axios";
const serverURL = "http://localhost:3000";

// Login authentication state

function App() {
  
  // Important useStates

  // Create protection for pages onyl useable by logged in users
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setUsername("");
    setIsAuthenticated(false)
  };

  //Holds username
  const [username, setUsername] = useState("");


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
                <Route path="/login" element={<Login login={login} setUsername={setUsername} username={username}/>}/>
                <Route path="/create-account" element={<CreateUser />}/>
                <Route path="/home-page" element={<ProtectedRoute isAuthenticated={isAuthenticated} passRoute={<HomePage logout={logout} username={username}/>} handleLoggedOut={<HandleLoggedOut/>}  />}>
                  <Route path="note-taker" element={<ProtectedRoute isAuthenticated={isAuthenticated} passRoute={<NoteTaker username={username}/>} handleLoggedOut={<HandleLoggedOut/>} />}/>
                  <Route path="todo-list" element={<ProtectedRoute isAuthenticated={isAuthenticated} passRoute={<TodoList username={username}/>} handleLoggedOut={<HandleLoggedOut/>} />}/>
                </Route>

            </Routes>
        </Router>
    </>
  );
}

export default App
export {serverURL}