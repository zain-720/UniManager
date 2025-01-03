import React, { useState, useEffect } from 'react';
import TextInput from '../Ultilities/TextInput';
import RequestCreation from './RequestCreation';
import NavigationButton from '../Ultilities/NavigationButton';
import './CreateAccount.css'

function CreateAccount(){

    //actively store username and password 
    const [userName, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirm, setUserPasswordConfirm] = useState("");

    const [creationResult, setCreationResult] = useState(true);
    const [passwordDiffCheck, setPasswordDiffResult] = useState(true);
    const [emptyCheck, emptyCheckResult] = useState(false);

    return (

        <div className='create-account-page'>
            <div className='create-account-container'>
                <h3>Username and Password fields cannot be empty</h3>
                <div className='creation-boxes'>
                    {emptyCheck && <h4>Username or Password feild is empty, fill them out</h4>}
                    {!creationResult && <h4>Username already taken try another one</h4>}
                    {!passwordDiffCheck && <h4>Passwords are different try again</h4>}
                    <TextInput type="text" placeholder="Username" value={userName} func={setUsername}/>
                    <TextInput type="password" placeholder="Password" value={userPassword} func={setUserPassword}/>
                    <TextInput type="password" placeholder="Input Same Password Again" value={userPasswordConfirm} func={setUserPasswordConfirm}/>
                    
                </div>
                <RequestCreation username={userName} password={userPassword} passwordConfirm={userPasswordConfirm} 
                    funcUser={setUsername} funcPass={setUserPassword} funcPassConf={setUserPasswordConfirm}
                    funcPasswordDiff={setPasswordDiffResult} funcUserCheck={setCreationResult} funcEmpty={emptyCheckResult}/>
                <NavigationButton route={'/'} text={"Cancel"}/>
            </div>
        </div>
    );
}

export default CreateAccount;