import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Website enterance page 
function WelcomeScreen() {

    

    const navigate = useNavigate(); //handle path navigation

    return (

        <div className='welcome-page text-center'>
            <div className="container">

                <div className="row"> 
                    <h2>Welcome to Uni-Manager!</h2>
                </div>

                <div className="row"> 
                    <div className='button-container d-flex flex-wrap justify-content-center gap-2'>
                        <button onClick={() => navigate('/login')}>Login</button>
                        <button onClick={() => navigate('/create-account')}>Create Account</button>     
                    </div>
                </div>

                <div className="row "> 
                    <div className="disclaimer-box">
                        <Link to="/disclaimer" className="link"><h4><span>Disclaimer</span> <span>PLEASE READ</span></h4></Link>
                    </div>
                </div>
                
                
                 
            </div>
        </div>    
    );
        
        


}

export default WelcomeScreen;