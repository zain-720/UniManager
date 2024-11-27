import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../App';


function HomePage(props) {
    const navigate = useNavigate();

    //Handle logout
    function handleLogout(){
        props.logout();
        navigate('/home-page');
    }

    return(
    <div>

        <h1>Welcome {props.username} </h1>
        <button onClick={handleLogout}>Log out</button>
    </div>
    );
}


export default HomePage;