import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePageComponents/HomePage';
import Login from './Components/LoginComponents/Login';




//Protection of pages with login
function ProtectedRoute(props){
    return props.isAuthenticated ? props.passRoute : props.login;
  };



  export default ProtectedRoute;