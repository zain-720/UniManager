import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import NoteTakerDisplay from './NoteTakerComponents/NoteTakerDisplay';
import GetNoteData from './NoteTakerComponents/GetNoteData';

//Protection of pages with login
function NoteTaker(props){
  const location = useLocation();

  //Set loading buffer for noteData
  const [loading, setLoading] = useState(true);

  //Display UseStates
  const [isNewNote, setIsNewNote] = useState(true);
  //Current Note
  const [currentNote, setCurrentNote] = useState("");
  //Current Note Name
  const [currentNoteName, setCurrentNoteName] = useState("");
  //Current Note Key 
  var currentNoteKey = "";
  //const [currentNoteKey, setCurrentNoteKey] = useState("");
  //Current Note Celing Key 
  var largestNoteKey = 0;
  //const [largestNoteKey, setLargestNoteKey] = useState(0);

  //Store NoteData return from database
  const [noteData, setNoteData] = useState(null);

  // Get note data for user whenever note-taker is opened
  useEffect(() => {
    const fetchData = async () => {
    setLoading(true);  
    await GetNoteData(setNoteData, props.username);
    setLoading(false);
    };
    fetchData();
  },[location]);


  // Handle saving and deletion requests 
  function handleSave(){
  }

  function handleDelete(){
  }

  if(loading){
    return(<h3>Loading...</h3>);
  }
  else{ //This will run after inital loading of the noteData

    return (
      <div>
        <h1>Hi {props.username} Welcome to note taker</h1>
        <NoteTakerDisplay 
        isNewNote={isNewNote} setIsNewNote={setIsNewNote}
        currentNote={currentNote} setCurrentNote={setCurrentNote}
        currentNoteName={currentNoteName} setCurrentNoteName={setCurrentNoteName}
        currentNoteKey={currentNoteKey}
        largestNoteKey={largestNoteKey}
        noteData={noteData}/>

        <button onClick={handleSave}>Save Note</button>
        {!isNewNote && <button onClick={handleDelete}>Delete Note</button>}
      </div>
    );
  }
  
};

export default NoteTaker;