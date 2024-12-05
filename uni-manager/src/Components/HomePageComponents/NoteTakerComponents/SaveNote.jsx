import React from "react";
import axios from "axios";
import GetNoteData from "./GetNoteData";
import { serverURL } from '../../../App';


const SaveNote = async (props)=> {

    //console.log("Save Note");
   
    var currNoteKey = props.currentNoteKey

    if(currNoteKey === ""){//Check if the user ever changed from New Note, if not then hard set the new key here

        currNoteKey = (props.noteData.key_number).toString();
    }

    if(props.isNewNote){ //We are adding in a new note
        

        
        //Update useState and database
        const updatedNotes = [...props.noteData.notes, {key: currNoteKey, title: props.currentNoteName, text: props.currentNote }]
        props.setNoteData({...props.noteData, notes: updatedNotes, key_number: parseInt(currNoteKey)+1}); //Update the notes text
        
        const newKey = parseInt(currNoteKey)+1;

        //console.log("Data to be sent NEW22", props.noteData);
        //console.log("note",props.currentNote);
        //console.log("title",props.currentNoteName);
        //console.log("key", currNoteKey);
        //console.log("next key", newKey);

       
        const response = await axios.put(serverURL + "/requestAddNote", {newData: updatedNotes, username: props.username, newKeyValue: newKey })
        //console.log("Server response:", response.data);
        //console.log("hi1");

        //Move to new menu location
        props.handleSelect(JSON.stringify({
            newNote: false,
            title: props.currentNoteName,
            text: props.currentNote,
            key: props.currentNoteKey
        }));

    }
    else{ // We are updating an existing note

        //console.log("Old note",props.noteData.notes);
        //console.log("Current note",props.currentNote);
        //console.log("Ket to search for",props.currentNoteKey);

        //find index of note to update
        const index = props.noteData.notes.findIndex(element => {
            console.log(element.key);
            console.log(props.currentNoteKey);
            return element.key === props.currentNoteKey});

        //console.log("Note Key", index);
        
        //Update useState and database
        const updatedNotes = [...props.noteData.notes];
        updatedNotes[index] = {...updatedNotes[index], text: props.currentNote};
        props.setNoteData({...props.noteData, notes: updatedNotes}); //Update the notes text

        //console.log("Data to be sent", updatedNotes);
        const response = await axios.put(serverURL + "/requestUpdateOrDeleteNote", {newData: updatedNotes, username: props.username})
        //console.log("Server response:", response.data);
        //console.log("hi2");

    }
}

export default SaveNote;