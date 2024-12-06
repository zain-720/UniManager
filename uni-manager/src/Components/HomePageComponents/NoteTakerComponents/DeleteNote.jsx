import axios from "axios";
import { serverURL } from '../../../App';


//Component used to delete notes 
const DeleteNote = async (props)=> {

    const newNoteKey = (props.noteData.key_number).toString();

    //Get index of the note to delete
    const index = props.noteData.notes.findIndex(element => {
        return element.key === props.currentNoteKey});

    const updatedNotes = props.noteData.notes.filter((_,i) => i !== index); //Remove note with the index we found 

    props.setNoteData({...props.noteData, notes: updatedNotes}); //Update note data
    const response = await axios.put(serverURL + "/requestUpdateOrDeleteNote", {newData: updatedNotes, username: props.username}); //Send updated notes array to database
    //console.log("Server response:", response.data);
    
    //Move to newNote
    props.handleSelect(JSON.stringify({
        newNote: true,
        title: "",
        text: "",
        key: newNoteKey
    }));

}


export default DeleteNote;