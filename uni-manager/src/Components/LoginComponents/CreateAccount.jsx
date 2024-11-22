import React, { useState, useEffect } from 'react';
import TextInput from '../Ultilities/textInput';
import RequestCreation from '../Ultilities/RequestCreation';

function CreateAccount(){

    //actively store username and password 
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
    const [creationResult, setCreationResult] = useState(true);
    const [passwordCheck, setPasswordResult] = useState(true);
    return (

        <div>
            {!creationResult && <h3>Username already taken try another one</h3>}
            {!passwordCheck && <h3>Passwords are different try again</h3>}
            <TextInput type="text" placeholder="Username" variable={userName} func={setUserName}/>
            <TextInput type="password" placeholder="Password" variable={userPassword} func={setUserPassword}/>
            <TextInput type="password" placeholder="Input Same Password Again" variable={userPasswordConfirm} func={setUserPasswordConfirm}/>
            <RequestCreation username={userName} password={userPassword} passwordConfirm={userPasswordConfirm} funcPassword={setPasswordResult} func={setCreationResult}/>
            <h2>{userName}</h2>
            <h2>{userPassword}</h2>
        </div>
    );
}

export default CreateAccount;