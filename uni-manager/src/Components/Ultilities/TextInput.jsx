import React from "react";

function TextInput(props) {

    function handleChange(event){
        props.func(event.target.value);
    }


    return (
        <input type={props.type} value={props.value} onChange={handleChange} placeholder={props.placeholder} />
    );
}

export default TextInput;