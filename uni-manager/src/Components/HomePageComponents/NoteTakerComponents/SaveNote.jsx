import React from "react";
import axios from "axios";
import GetNoteData from './GetNoteData';
import AcquireNoteLock from "./AcquireNoteLock";
import { serverURL } from '../../../App';

//Component to save notes added/edited
const SaveNote = async (props)=> {

    try {
        
        // Acquire lock for note_data
        await AcquireNoteLock({username : props.username});

        // Acquire the latest note_data 
        const latestNoteData = await GetNoteData(props.setNoteData, props.username);
        //console.log("current data", latestNoteData);
        
        // Determine the current latest key if we are using a new note
        const latestKey = (latestNoteData.key_number).toString();
        const currNoteKey = props.isNewNote ? latestKey : props.currentNoteKey
        
        if(props.isNewNote){ //We are adding in a new note
            
            if(props.currentNoteName === ""){ // If note name is empty block the save request
                props.setIsNameEmpty(true);
                //Release the lock
                await axios.post(serverURL + "/releaseNoteLock", { username: props.username });
                
            }
            else{

                //Update useState and database
                const updatedNotes = [{key: currNoteKey, title: props.currentNoteName, text: props.currentNote }, ...latestNoteData.notes]
                const newKey = parseInt(currNoteKey)+1;
                props.setNoteData({...latestNoteData, notes: updatedNotes, key_number: newKey}); //Update the notes text 
                const response = await axios.put(serverURL + "/requestAddNote", {newData: updatedNotes, username: props.username, newKeyValue: newKey });
                //console.log("Server response:", response.data);

                //Move to new menu location
                props.handleSelect(JSON.stringify({
                    newNote: false,
                    title: props.currentNoteName,
                    text: props.currentNote,
                    key: latestKey
                }));

                //Release the lock
                await axios.post(serverURL + "/releaseNoteLock", { username: props.username });
            }
        }
        else{ // We are updating an existing note

            //find index of note to update
            const index = latestNoteData.notes.findIndex(element => {
                return element.key === currNoteKey});

            if(index > -1){
                //Update useState and database
                const updatedNotes = [...latestNoteData.notes];
                updatedNotes[index] = {...updatedNotes[index], text: props.currentNote};

                //Move the updated note to the front of the list 
                const movedNote = updatedNotes.splice(index, 1)[0];
                updatedNotes.unshift(movedNote);

                props.setNoteData({...latestNoteData, notes: updatedNotes}); //Update the notes text

                const response = await axios.put(serverURL + "/requestUpdateOrDeleteNote", {newData: updatedNotes, username: props.username});
                //console.log("Server response:", response.data);

                //Release the lock
                await axios.post(serverURL + "/releaseNoteLock", { username: props.username });
            }
            else{ // In this case this note we are working on was already deleted 

                //Add the note back at the given key 
                const updatedNotes = [{key: currNoteKey, title: props.currentNoteName, text: props.currentNote }, ...latestNoteData.notes]
                props.setNoteData({...latestNoteData, notes: updatedNotes}); //Update the notes text
                const newKey = parseInt(latestKey); // Not changing the key here, but just add the latest to maintain input 
                const response = await axios.put(serverURL + "/requestAddNote", {newData: updatedNotes, username: props.username, newKeyValue: newKey })
                //console.log("Server response:", response.data);

                //Release the lock
                await axios.post(serverURL + "/releaseNoteLock", { username: props.username });

            }
        }
    }
    catch(error){
        console.error(error);
        await axios.post(serverURL + "/releaseNoteLock", { username: props.username });

    }
}

export default SaveNote;