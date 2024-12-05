import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";

import NoteBox from './NoteBox';


//Creates the display for note taker
function NoteTakerDisplay(props){

    //Handle the selection of a new note
    function handleSelect(note){

        const obj = JSON.parse(note);

        const {newNote, text, title, key} = obj

        console.log(obj.key);
        props.setIsNewNote(newNote);
        props.setCurrentNote(text);
        props.setCurrentNoteName(title);
        props.setCurrentNoteKey(key);

    }

    const dropDownData = props.noteData.notes;
    const newNoteKey = props.noteData.key_number;

    const currentValue = JSON.stringify({
        newNote: props.isNewNote,
        title: props.currentNoteName,
        text: props.currentNote,
        key: props.currentNoteKey
    });

    return (

        <div>
            <div>
                <select value={currentValue} onChange={(e) => handleSelect(e.target.value)}>
                    <option value={JSON.stringify({newNote: true, title: "", text: "", key: newNoteKey })}>New Note</option>

                    {(dropDownData.length > 0) && dropDownData.map((noteInfo) =>{
                        return <option key={noteInfo.key} value={JSON.stringify({newNote: false, title: noteInfo.title, text: noteInfo.text, key: noteInfo.key})}>{noteInfo.title}</option>
                    }) }
                </select>
            </div>
            
            <div>
                <NoteBox currentNote={props.currentNote} setCurrentNote={props.setCurrentNote} isNewNote={props.isNewNote} 
                currentNoteName={props.currentNoteName} setCurrentNoteName={props.setCurrentNoteName} />
            </div>
            
        </div>
    );
};

export default NoteTakerDisplay;