import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../Ultilities/textInput';
import RequestLogin from './RequestLogin';


function Login(props) {
    //actively store username and password 
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginResult, setLoginResult] = useState(true);

    return (

        <div>
            {!loginResult && <h3>Username or password was incorrect try again</h3>}
            <TextInput type="text" placeholder="Username" func={props.setUsername}/>
            <TextInput type="password" placeholder="Password" variable={userPassword} func={setUserPassword}/>
            <RequestLogin username={props.username} password={userPassword} func={setLoginResult} login={props.login}/>
            <h2>{props.username}</h2>
            <h2>{userPassword}</h2>
        </div>
    );

}

export default Login;