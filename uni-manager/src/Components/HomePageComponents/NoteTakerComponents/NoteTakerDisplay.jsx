import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";

import NewNoteDisplay from './NewNoteDisplay';
import OldNoteDisplay from './OldNoteDisplay';

//Creates the display for note taker
function NoteTakerDisplay(props){

  //Handle the selection of a new note
  function handleSelect(note){

    props.setIsNewNote(note.newNote);

    props.setCurrentNote(note.name);

  }

  return (

    <div>
      <select value={props.currentNote} onChange={(e) => handleSelect(e.target.value)}>
        <option value={{newNote: true, name: "New Note" }}>Select First</option>
        <option value={{newNote: false, name: "Select 2nd"}}>Option 1</option>
        <option value={{newNote: false, name: "Select 3rd"}}>Option 2</option>
      </select>
      {props.isNewNote ? <NewNoteDisplay/>:<OldNoteDisplay/>}
    </div>
  );
};

export default NoteTakerDisplay;