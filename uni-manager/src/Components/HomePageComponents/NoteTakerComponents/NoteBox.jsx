import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";

import TextInput from '../../Ultilities/textInput';


//Protection of pages with login
function NoteBox(props){

    const handleChange = (event) => {
        props.setCurrentNote(event.target.value);
    };

    const handleNameChange = (event) => {
        props.setCurrentNoteName(event.target.value);
    };

    return (

        <div>

            <div>
                {props.isNewNote ? <input type="text" value={props.currentNoteName} onChange={handleNameChange} 
                placeholder="Note Name" maxLength={120} style={{width: '400px' }}/>  : <h3>{props.currentNoteName}</h3>}
            </div>
            <div >
                <textarea 
                value={props.currentNote}
                onChange={handleChange}
                placeholder="Enter note here"
                rows={20}
                style={{height: '300px', width: '800px' }}
                />
            </div>
        </div>
    );
};

export default NoteBox;