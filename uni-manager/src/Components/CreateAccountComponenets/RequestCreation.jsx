import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { serverURL } from '../../App';

//Component for making the login request
function RequestCreation(props){
    const navigate = useNavigate();

    async function handleClick(){

        
        const user = props.username;
        const pass = props.password;
        const passConfirm = props.passwordConfirm;

        //initally set all the error messages back to true to avoid both at the same time
        props.funcPassword(true);
        props.func(true);

        if(pass !== passConfirm){ //Check if the user confirmed their password

            props.funcPassword(false);

        }
        else{
            try{
                //Request the server check if the inputed password is correct
                const response = await axios.post(serverURL + "/requestCreation", { username: user, password: pass,})

                // Check if creation passed
                if(response.data.output == true){
                    props.func(response.data.output); //let state know creation passed
                    //redirect to login 
                    navigate('/login');
                }
                else{   
                    props.func(response.data.output); //let state know creation failed
                    
                }
            }
            catch(err){
                console.error(err);
            }
        }
        
    }
   return(
    <button onClick={handleClick}>Create Account</button>
   ); 

}

export default RequestCreation;