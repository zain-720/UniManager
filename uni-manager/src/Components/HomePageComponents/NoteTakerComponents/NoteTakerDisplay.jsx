import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";

import NoteBox from './NoteBox';


//Creates the display for note taker
function NoteTakerDisplay(props){

    //Handle the selection of a new note
    function handleSelect(note){

        props.setIsNewNote(note.newNote);
        props.setCurrentNote(note.text);
        props.setCurrentNoteName(note.title);
        props.currentNoteKey(key);

    }

    const dropDownData = props.noteData.notes;
    const newNoteKey = props.noteData.key_value;

    return (

        <div>
            <div>
                <select value={props.currentNote} onChange={(e) => handleSelect(e.target.value)}>
                    <option value={{newNote: true, title: "", text: "", key: newNoteKey }}>Select First</option>

                    {(dropDownData.length > 0) && dropDownData.map(function(noteInfo){
                        <option key={noteInfo.key} value={{newNote: false, title: noteInfo.title, text: noteInfo.note, key: noteInfo.key}}></option>
                    }) }
                </select>
            </div>
            
            <div>
                <NoteBox currentNote={props.currentNote} setCurrentNote={props.setCurrentNote} isNewNote={props.isNewNote} 
                currentNoteName={props.currentNoteName} setCurrentNoteName={props.setCurrentNoteName}/>
            </div>
        </div>
    );
};

export default NoteTakerDisplay;