import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { serverURL } from '../../App';
import GetNoteData from './NoteTakerComponents/GetNoteData';
import GetTodoListData from './TodoListComponents/GetTodoListData';
import { Link, Outlet } from "react-router-dom";
import './HomePage.css';

//Utility imports 
import NavigationButton from '../Ultilities/NavigationButton';

//TodoList Imports 
import UpcomingDeadlines from './TodoListComponents/UpcomingDeadlines';




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
    <div className='home-page'>
        
        {/* Display app buttons here */}
        <div className='top-bar'>
            <div className='top-bar-grid'>
                <div className='top-bar-main-app-grid'>
                    <h1>Welcome {props.username} </h1>    
                    <button onClick={handleNoteTaker}>Note Taker</button>
                    <button onClick={handleTodoList}>Todo List</button>
                </div>
                <div>
                    <h4></h4>
                </div>
            </div>    
        </div>

        {/* Display child routes here */}
        <div className='middle-content'>
            <div className='main-area'>
                {location.pathname === '/home-page/note-taker' && <Outlet context={[noteData, setNoteData, loading, setLoading ]}/>}
                {location.pathname === '/home-page/todo-list' && <Outlet context={[todoData, setTodoData, loading, setLoading ]}/>}
            </div>
            <div className='side-area'>
                <UpcomingDeadlines 
                    todoData={todoData} 
                    setTodoData={setTodoData}
                    username={props.username}
                />
            </div>
            
            
        </div>

        <div className='bottom-bar'>
            <button onClick={handleLogout}>Log out</button>
        </div>
        
    </div>
    );
}


export default HomePage;