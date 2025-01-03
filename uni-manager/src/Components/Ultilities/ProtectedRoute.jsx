import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//Protection of pages with login
function ProtectedRoute(props){
    return props.isAuthenticated ? props.passRoute : props.handleLoggedOut;
  };

  export default ProtectedRoute;