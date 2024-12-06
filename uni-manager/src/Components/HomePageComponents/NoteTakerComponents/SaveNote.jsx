import React from "react";
import axios from "axios";
import { serverURL } from '../../../App';


const SaveNote = async (props)=> {

    //console.log("Save Note");
   
    var currNoteKey = props.currentNoteKey


    if(props.isNewNote){ //We are adding in a new note
        
        if(props.currentNoteName === ""){ // If note name is empty block the save request
            props.setIsNameEmpty(true);
        }
        else{
            //Update useState and database
            const updatedNotes = [{key: currNoteKey, title: props.currentNoteName, text: props.currentNote }, ...props.noteData.notes]
            props.setNoteData({...props.noteData, notes: updatedNotes, key_number: parseInt(currNoteKey)+1}); //Update the notes text
            const newKey = parseInt(currNoteKey)+1;
            const response = await axios.put(serverURL + "/requestAddNote", {newData: updatedNotes, username: props.username, newKeyValue: newKey })
            //console.log("Server response:", response.data);

            //Move to new menu location
            props.handleSelect(JSON.stringify({
                newNote: false,
                title: props.currentNoteName,
                text: props.currentNote,
                key: props.currentNoteKey
            }));
        }
        

    }
    else{ // We are updating an existing note

        //find index of note to update
        const index = props.noteData.notes.findIndex(element => {
            return element.key === props.currentNoteKey});
        
        //Update useState and database
        const updatedNotes = [...props.noteData.notes];
        updatedNotes[index] = {...updatedNotes[index], text: props.currentNote};

        //Move the updated note to the front of the list 
        const movedNote = updatedNotes.splice(index, 1)[0];
        updatedNotes.unshift(movedNote);

        props.setNoteData({...props.noteData, notes: updatedNotes}); //Update the notes text

        const response = await axios.put(serverURL + "/requestUpdateOrDeleteNote", {newData: updatedNotes, username: props.username});
        //console.log("Server response:", response.data);

    }
}

export default SaveNote;