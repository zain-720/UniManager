import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { serverURL } from '../../App';
import GetNoteData from './NoteTakerComponents/GetNoteData';
import { Link, Outlet } from "react-router-dom";

//Utility imports 
import NavigationButton from '../Ultilities/NavigationButton';




function HomePage(props) {
    const navigate = useNavigate();
    const location = useLocation();

    // Homepage level usestates

    //Set loading buffer for noteData
    const [loading, setLoading] = useState(true);

    //Store NoteData return from database
    const [noteData, setNoteData] = useState(null);

    // Homepage navigation helpers 

    //Handle logout
    const handleLogout = () => {
        props.logout();
        navigate('/home-page');
    }

    //Handle move to note-taker
    const handleNoteTaker = async () => {
        setLoading(true);  
        await GetNoteData(setNoteData, props.username);
        setLoading(false);
        navigate('/home-page/note-taker');
      };

    return(
    <div>
        <h1>Welcome {props.username} </h1>

        {/* Display child route buttons here */}
        <div>
        <button onClick={handleNoteTaker}>Note Taker</button>
        </div>

        {/* Display child routes here */}
        <div>
            {location.pathname === '/home-page/note-taker' && <Outlet context={[noteData, setNoteData, loading, setLoading ]}/>}
            
        </div>

        <div>
            <button onClick={handleLogout}>Log out</button>
        </div>
        
    </div>
    );
}


export default HomePage;