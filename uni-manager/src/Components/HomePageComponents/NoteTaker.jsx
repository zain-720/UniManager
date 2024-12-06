import React, { useState, useEffect } from 'react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import axios from "axios";
import NoteTakerDisplay from './NoteTakerComponents/NoteTakerDisplay';
import GetNoteData from './NoteTakerComponents/GetNoteData';
import SaveNote from './NoteTakerComponents/SaveNote';
import NoteBox from './NoteTakerComponents/NoteBox';
import DeleteNote from './NoteTakerComponents/DeleteNote';

//Protection of pages with login
function NoteTaker(props){
  const location = useLocation();
  const navigate = useNavigate();

  //Get useStates from parent
  const [
    noteData, 
    setNoteData,
    loading, 
    setLoading
  ] = useOutletContext();

  //Display UseStates
  const [isNewNote, setIsNewNote] = useState(true);
  //Current Note
  const [currentNote, setCurrentNote] = useState("");
  //Current Note Name
  const [currentNoteName, setCurrentNoteName] = useState("");
  //Current Note Key 
  const [currentNoteKey, setCurrentNoteKey] = useState("");
  

  // Handle saving requests 
  async function handleSave(){
    //console.log(isNewNote);
    SaveNote({
      username: props.username,
      isNewNote: isNewNote,
      setIsNewNote: setIsNewNote,
      currentNote: currentNote,
      setCurrentNote: setCurrentNote,
      currentNoteName: currentNoteName,
      setCurrentNoteName: setCurrentNoteName,
      currentNoteKey: currentNoteKey,
      noteData: noteData,
      setNoteData: setNoteData,
      handleSelect: handleSelect
    });
    //console.log("back");
    //console.log(isNewNote);

  }

  // Handle note deletion requests 
  async function handleDelete(){
    DeleteNote({username: props.username, noteData: noteData, setNoteData: setNoteData, currentNoteKey, handleSelect: handleSelect});
  }

  //Handle the selection of a new note
  function handleSelect(note){

    const obj = JSON.parse(note);

    const {newNote, text, title, key} = obj
    //console.log("here moving");
    //console.log(obj);
    setIsNewNote(newNote);
    setCurrentNote(text);
    setCurrentNoteName(title);
    setCurrentNoteKey(key);

  }

  //Drop down menu variables 
  //const dropDownData = noteData.notes;

  const newNoteKey = noteData.key_number;

  if(loading){
    return(<h3>Loading...</h3>);
  }
  else{ //This will run after inital loading of the noteData
    return (
      <div>
        <h1>Hi {props.username} Welcome to note taker</h1>
        <div>
            <div>
                <select value={currentNoteKey} onChange={(e) => { const selectedOption = (noteData.notes.find(note=> note.key === e.target.value))||{newNote: true, title: "", text: "", key: newNoteKey.toString()}; 
                handleSelect(
                  JSON.stringify({
                    newNote: selectedOption.newNote,
                    title: selectedOption.title,
                    text: selectedOption.text,
                    key: selectedOption.key
                })
                ); }}>
                    <option value={newNoteKey.toString()}>New Note</option>

                    {(noteData.notes.length > 0) && noteData.notes.map((noteInfo) =>{
                        return <option key={noteInfo.key} value={noteInfo.key}>{noteInfo.title}</option>
                    }) }
                </select>
            </div>
            <div>
                <NoteBox currentNote={currentNote} setCurrentNote={setCurrentNote} isNewNote={isNewNote} 
                currentNoteName={currentNoteName} setCurrentNoteName={setCurrentNoteName} />
            </div>
        </div>

        <button onClick={handleSave}>Save Note</button>
        {!isNewNote && <button onClick={handleDelete}>Delete Note</button>}
      </div>
    );
  }
  
};

export default NoteTaker;