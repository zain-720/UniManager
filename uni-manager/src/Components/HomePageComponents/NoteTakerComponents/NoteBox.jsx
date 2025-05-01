import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import '../NoteTaker.css'

import TextInput from '../../Ultilities/TextInput';


//Protection of pages with login
function NoteBox(props){

    const handleChange = (event) => {
        props.setCurrentNote(event.target.value);
    };

    const handleNameChange = (event) => {
        props.setCurrentNoteName(event.target.value);
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header">
                {props.isNewNote ? 
                    <input 
                        type="text" 
                        className="form-control" 
                        value={props.currentNoteName} 
                        onChange={handleNameChange} 
                        placeholder="Note Name" 
                        maxLength={120}
                    /> : 
                    <h3 className="mb-0">{props.currentNoteName}</h3>
                }
            </div>
            <div className="card-body">
                <textarea 
                    className="form-control"
                    value={props.currentNote}
                    onChange={handleChange}
                    placeholder="Enter note here"
                    rows={20}
                />
            </div>
        </div>
    );
};

export default NoteBox;