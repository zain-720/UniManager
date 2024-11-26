import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverURL, login, logout } from '../../App';


function HomePage() {
    const navigate = useNavigate();

    //Handle logout
    function handleClick(){
        logout;
        navigate('/home-page');
    }

    return(
    <div>
        <button onClick={handleClick}>Log out</button>
    </div>);
}


export default HomePage;