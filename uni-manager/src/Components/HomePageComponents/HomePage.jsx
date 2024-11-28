import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../App';
import { Link, Outlet } from "react-router-dom";

//Utility imports 
import NavigationButton from '../Ultilities/NavigationButton';


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

        {/* Display child routes here */}
        <div>
            <NavigationButton route={'note-taker'} text={"Note Taker"}/>
        </div>

        {/* Display child routes here */}
        <div>
            <Outlet/>
        </div>

        <div>
            <button onClick={handleLogout}>Log out</button>
        </div>
        
    </div>
    );
}


export default HomePage;