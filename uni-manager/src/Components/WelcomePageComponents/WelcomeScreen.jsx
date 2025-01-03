import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

//Website enterance page 
function WelcomeScreen() {

    

    const navigate = useNavigate(); //handle path navigation

    return (

        <div className='welcome-page'>
            <div className='welcome-container'>
                <div className='text-box'>
                    <h2>Welcome to Uni-Manager!</h2>
                </div>
                <div className='button-container'>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/create-account')}>Create Account</button>     
                </div>
                 
            </div>
        </div>    
    );
        
        


}

export default WelcomeScreen;