
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisclaimerPage.css'
import NavigationButton from '../Ultilities/NavigationButton';

function DisclaimerPage() {

    return(
    
    <div className='disclaimer-page'>
        <div className='container'>
           <h4>This app hosts its server on Render.com's free plan, which means that Render will put the server to sleep after a period of inactivity. So if login or create user does nothing please be patient and try again in 5-30 seconds once the server wakes up if you still havent been logged in within that time. <br/> <br/> 
            This issue only exists as a byproduct of using the free plan, this disclaimer will disappear once the server is moved to a host/plan that does not ever put the server to sleep for inactivity.</h4>  
            <NavigationButton route={'/'} text={"Back"}/> 
        </div>
      
    </div>
    


);

}


export default DisclaimerPage