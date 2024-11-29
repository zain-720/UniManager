import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { serverURL } from '../../../App';
import axios from "axios";


//Get the note data for the given user
const GetNoteData = async(setNoteData, largestNoteKey, username) =>{
    
    try{
        //Get user note data and their largest note key
        const response = await axios.get(serverURL + "/requestNoteData", { params: {username} });
        // Check if the user has notes made or not
        if((response.data.notes).length > 0){
            console.log("notes not empty");
            setNoteData(response.data);
            largestNoteKey = response.data.key_number;
        }
        else{
            console.log("notes empty");
            largestNoteKey = response.data.key_number;
        }
    }
    catch(err){
        console.error(err);
    }
};

export default GetNoteData;
