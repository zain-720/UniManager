import React, { useState } from 'react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import axios from "axios";
import GetNoteData from './NoteTakerComponents/GetNoteData';
import SaveNote from './NoteTakerComponents/SaveNote';
import NoteBox from './NoteTakerComponents/NoteBox';
import DeleteNote from './NoteTakerComponents/DeleteNote';
import './NoteTaker.css';

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

  //Booleans isNewNote, isNameEmpty
  const [isNewNote, setIsNewNote] = useState(true);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  //Current Note
  const [currentNote, setCurrentNote] = useState("");
  //Current Note Name
  const [currentNoteName, setCurrentNoteName] = useState("");
  //Current Note Key 
  const [currentNoteKey, setCurrentNoteKey] = useState((noteData.key_number).toString());
  

  // Handle saving requests 
  async function handleSave(){
    setLoading(true);
    SaveNote({
      username: props.username,
      isNewNote: isNewNote,
      currentNote: currentNote,
      currentNoteName: currentNoteName,
      currentNoteKey: currentNoteKey,
      noteData: noteData,
      setNoteData: setNoteData,
      handleSelect: handleSelect,
      setIsNameEmpty: setIsNameEmpty
    });
    setLoading(false);
  }

  // Handle note deletion requests 
  async function handleDelete(){
    setLoading(true);
    DeleteNote({username: props.username, noteData: noteData, setNoteData: setNoteData, currentNoteKey: currentNoteKey, handleSelect: handleSelect});
    setLoading(false);
  }

  //Handle the selection of a new note
  function handleSelect(note){

    const obj = JSON.parse(note);
    const {newNote, text, title, key} = obj

    setIsNameEmpty(false); //By default reset this to false upon any change 
    setIsNewNote(newNote);
    setCurrentNote(text);
    setCurrentNoteName(title);
    setCurrentNoteKey(key);
  }

  //Drop down menu variables 
  const dropDownData = noteData.notes;
  const newNoteKey = noteData.key_number;

  if(loading){
    return(<h3>Loading...</h3>);
  }
  else{ //This will run after inital loading of the noteData
    //Output the note taker
    return (
      <div className='note-taker-container'>
        <h3>Note Taker app v2</h3>
        <div>
            <select value={currentNoteKey} onChange={(e) => { const selectedOption = (dropDownData.find(note=> note.key === e.target.value))||{newNote: true, title: "", text: "", key: newNoteKey.toString()}; 
            handleSelect(
              JSON.stringify({
                newNote: selectedOption.newNote,
                title: selectedOption.title,
                text: selectedOption.text,
                key: selectedOption.key
            })
            ); }}>
                <option value={newNoteKey.toString()}>New Note</option>

                {(dropDownData.length > 0) && dropDownData.map((noteInfo) =>{
                    return <option key={noteInfo.key} value={noteInfo.key}>{noteInfo.title}</option>
                }) }
            </select>
        </div>
        <div>
            {isNameEmpty && <h4>Note name cannot be empty!</h4>}
            <NoteBox currentNote={currentNote} setCurrentNote={setCurrentNote} isNewNote={isNewNote} 
            currentNoteName={currentNoteName} setCurrentNoteName={setCurrentNoteName} />
        </div>
        <button onClick={handleSave}>Save Note</button>
        {!isNewNote && <button onClick={handleDelete}>Delete Note</button>}
      </div>
    );
  }

};

export default NoteTaker;