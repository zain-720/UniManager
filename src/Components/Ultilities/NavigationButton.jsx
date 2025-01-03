import React from 'react';
import { useNavigate } from 'react-router-dom';

//Button used for simple naviagtion
//requires a route given to it as 'route' and text given as 'text'
function NavigationButton(props){

    const navigate = useNavigate();

    function handleClick(){

        navigate(props.route);

    }

    return(<button onClick={handleClick}>{props.text}</button>);

}


export default NavigationButton;