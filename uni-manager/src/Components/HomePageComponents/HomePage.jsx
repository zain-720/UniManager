import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { serverURL } from '../../App';
import GetNoteData from './NoteTakerComponents/GetNoteData';
import GetTodoListData from './TodoListComponents/GetTodoListData';
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

    //Store NoteData return from database
    const [todoData, setTodoData] = useState(null);

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

    //Handle move to todo-list
    //Handle move to note-taker
    const handleTodoList = async () => {
        setLoading(true);  
        await GetTodoListData(setTodoData, props.username);
        setLoading(false);
        navigate('/home-page/todo-list');
      };

    return(
    <div>
        <h1>Welcome {props.username} </h1>

        {/* Display child route buttons here */}
        <div>
        <button onClick={handleNoteTaker}>Note Taker</button>
        <button onClick={handleTodoList}>Todo List</button>
        </div>

        {/* Display child routes here */}
        <div>
            {location.pathname === '/home-page/note-taker' && <Outlet context={[noteData, setNoteData, loading, setLoading ]}/>}
            {location.pathname === '/home-page/todo-list' && <Outlet context={[todoData, setTodoData, loading, setLoading ]}/>}
            
        </div>

        <div>
            <button onClick={handleLogout}>Log out</button>
        </div>
        
    </div>
    );
}


export default HomePage;