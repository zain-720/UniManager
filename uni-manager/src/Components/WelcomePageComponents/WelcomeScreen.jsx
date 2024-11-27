import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Website enterance page 
function WelcomeScreen() {

    

    const navigate = useNavigate(); //handle path navigation

    return (
        <div>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/create-account')}>Create Account</button>      
        </div>
    );


}

export default WelcomeScreen;