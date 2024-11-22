import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../Ultilities/textInput';
import RequestLogin from '../Ultilities/RequestLogin';


function Login() {
    //actively store username and password 
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginResult, setLoginResult] = useState(true);

    return (

        <div>
            {!loginResult && <h3>Username or password was incorrect try again</h3>}
            <TextInput type="text" placeholder="Username" variable={userName} func={setUserName}/>
            <TextInput type="password" placeholder="Password" variable={userPassword} func={setUserPassword}/>
            <RequestLogin username={userName} password={userPassword} func={setLoginResult}/>
            <h2>{userName}</h2>
            <h2>{userPassword}</h2>
        </div>
    );

}

export default Login;