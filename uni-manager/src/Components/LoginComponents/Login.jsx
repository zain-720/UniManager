import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../Ultilities/textInput';
import RequestLogin from './RequestLogin';
import NavigationButton from '../Ultilities/NavigationButton';


function Login(props) {

    //actively store username and password 
    const username = props.username;
    const [userPassword, setUserPassword] = useState("");
    const [loginResult, setLoginResult] = useState(true);

    return (

        <div>
            <div>
                {!loginResult && <h3>Username or password was incorrect try again</h3>}
                <TextInput type="text" placeholder="Username" func={props.setUsername} value={username}/>
                <TextInput type="password" placeholder="Password" func={setUserPassword} value={userPassword}/>
                <RequestLogin username={username} password={userPassword} func={setLoginResult} funcPass={setUserPassword} funcUser={props.setUsername} login={props.login}/>
                <h2>{props.username}</h2>
                <h2>{userPassword}</h2>
            </div>
            
            <NavigationButton route={'/'} text={"Cancel"}/>

        </div>
    );

}

export default Login;