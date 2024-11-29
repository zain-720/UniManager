import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { serverURL } from '../../../App';
import axios from "axios";


//Get the note data for the given user
const GetNoteData = async(setNoteData, username) =>{
    
    try{
        //Get user note data and their largest note key
        const response = await axios.get(serverURL + "/requestNoteData", { params: {username} });
        
        //Set data up
        setNoteData(response.data);

    }
    catch(err){
        console.error(err);
    }
};

export default GetNoteData;
