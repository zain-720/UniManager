import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { serverURL } from '../../App';

//Component for making the login request



function RequestLogin(props){
    const navigate = useNavigate();

    async function handleClick(){

        const user = props.username;
        const pass = props.password;
        
        try{
            //Request the server check if the inputed password is correct
            const response = await axios.get(serverURL + "/requestLogin", { params: { username: user, password: pass,} })

            //Check if the password was correct
            if(response.data.output == true){
                props.func(response.data.output); //let state know login was passed
                console.log("You logged in");

                //redirect to homepage
                props.login(); //Set login state to true 
                navigate('/home-page');
            }
            else{   
                props.func(response.data.output); //let state know login failed

            }
        }
        catch(err){
            console.error(err);
        }
    }
   return(
    <button onClick={handleClick}>Log in</button>
   ); 

}

export default RequestLogin;