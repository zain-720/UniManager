import React from "react";

function TextInput(props) {

    function handleChange(event){
        const newText = event.target.value;
        props.func(newText)
    }


    return (
        <input type={props.type} onChange={handleChange} placeholder={props.placeholder} />
    );
}

export default TextInput;