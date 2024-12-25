import axios from "axios";
import { serverURL } from '../../../App';
import GetNoteData from './GetNoteData';
import AcquireNoteLock from "./AcquireNoteLock";

//Component used to delete notes 
const DeleteNote = async (props)=> {

    try{

        // Acquire lock for note_data
        await AcquireNoteLock(props.username);

        // Acquire the latest note_data 
        const latestNoteData = await GetNoteData(props.setNoteData, props.username);

        const newNoteKey = (props.noteData.key_number).toString();

        //Get index of the note to delete
        const index = latestNoteData.notes.findIndex(element => {
            return element.key === props.currentNoteKey});
        
        if(index > -1){
            const updatedNotes = latestNoteData.notes.filter((_,i) => i !== index); //Remove note with the index we found 

            props.setNoteData({...latestNoteData, notes: updatedNotes}); //Update note data
            const response = await axios.put(serverURL + "/requestUpdateOrDeleteNote", {newData: updatedNotes, username: props.username}); //Send updated notes array to database
            //console.log("Server response:", response.data);
            
            //Move to newNote
            props.handleSelect(JSON.stringify({
                newNote: true,
                title: "",
                text: "",
                key: newNoteKey
            }));

            //Release the lock
            await axios.post(serverURL + "/releaseNoteLock", { username: props.username });
        }
        else{ // The note we are trying to delete was already deleted 

            //No need to send anythng to the db move to new note 

            //Move to newNote
            props.handleSelect(JSON.stringify({
                newNote: true,
                title: "",
                text: "",
                key: newNoteKey
            }));

            //Release the lock
            await axios.post(serverURL + "/releaseNoteLock", { username: props.username });

        }
    }
    catch(error) {
        console.error(error);
        await axios.post(serverURL + "/releaseNoteLock", { username: props.username });
    }
}


export default DeleteNote;