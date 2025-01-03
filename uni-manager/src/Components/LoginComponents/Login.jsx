import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../Ultilities/TextInput';
import RequestLogin from './RequestLogin';
import NavigationButton from '../Ultilities/NavigationButton';
import './Login.css';


function Login(props) {

    //actively store username and password 
    const username = props.username;
    const [userPassword, setUserPassword] = useState("");
    const [loginResult, setLoginResult] = useState(true);

    return (

        <div className='login-page'>
            <div className='login-container'>
                {!loginResult ? <h3>Username or password was incorrect try again</h3> : <h3></h3>}
                <TextInput type="text" placeholder="Username" func={props.setUsername} value={username}/>
                <TextInput type="password" placeholder="Password" func={setUserPassword} value={userPassword}/>
                <RequestLogin username={username} password={userPassword} func={setLoginResult} funcPass={setUserPassword} funcUser={props.setUsername} login={props.login}/>
                <NavigationButton route={'/'} text={"Cancel"}/>
            </div>
            
            

        </div>
    );

}

export default Login;