import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { serverURL } from '../../App';

//Component for making the login request
// Check for possible input errors handle each 

function RequestCreation(props){
    const navigate = useNavigate();

    //Clear field data
    function clearData(){
        props.funcUser("");
        props.funcPass("");
        props.funcPassConf("");
    }

    async function handleClick(){

        const user = props.username;
        const pass = props.password;
        const passConfirm = props.passwordConfirm;

        //Reset all previous error calls 
        props.funcPasswordDiff(true);
        props.funcUserCheck(true);
        props.funcEmpty(false);

        if((user === "" || pass === "" || passConfirm === "")){ // Confirm no input field is empty 
            clearData();
            props.funcEmpty(true);
        }
        else if(pass !== passConfirm){ //Check if the user confirmed their password correctly

            clearData();
            // Let Create Account know the user did not confirm their password correctly
            props.funcPasswordDiff(false);
        }
        else{
            try{
                //Request the server check if the inputed password is correct
                const response = await axios.post(serverURL + "/requestCreation", { username: user, password: pass,})

                // Check if creation passed
                if(response.data.output == true){
                    clearData();
                    props.funcUserCheck(response.data.output); //let  Create Account know it passed
                    //redirect to login 
                    navigate('/login');
                }
                else{   
                    clearData();
                    props.funcUserCheck(response.data.output); //let Create Account know it failed due to duplicate username     
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