import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { serverURL } from '../../App';
import GetNoteData from './NoteTakerComponents/GetNoteData';
import GetTodoListData from './TodoListComponents/GetTodoListData';
import GetScheduleData from './ScheduleBuilderComponenets/GetScheduleData';

import { Link, Outlet } from "react-router-dom";
import './HomePage.css';

//Utility imports 
import NavigationButton from '../Ultilities/NavigationButton';

//TodoList Imports 
import UpcomingDeadlines from './TodoListComponents/UpcomingDeadlines';

//Schedule imports
import CurrentEvent from './ScheduleBuilderComponenets/CurrentEvent';




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

    const [scheduleData, setScheduleData] = useState(null);

    // Homepage navigation helpers 

    //Handle logout
    const handleLogout = () => {
        props.logout();
        navigate('/home-page');
    }

    // Handle start up of child application
    const handleFunctionStart = async (GetData, setData, route) => {
        setLoading(true);  
        await GetData(setData, props.username);
        setLoading(false);
        navigate(route);
      };

    return(
    <div className='home-page'>
        
        {/* Display app buttons here */}
        <div className='top-bar'>
            <div className='top-bar-grid'>
                <div className='top-bar-main-app-grid'>
                    <h1>Welcome</h1>    
                    <button onClick={() => handleFunctionStart(GetNoteData, setNoteData, '/home-page/note-taker')}>Note Taker</button>
                    <button onClick={() => handleFunctionStart(GetTodoListData, setTodoData, '/home-page/todo-list')}>Todo List</button>
                    <button onClick={() => handleFunctionStart(GetScheduleData, setScheduleData, '/home-page/schedule-builder')}>Weekly Schedule</button>
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
                {location.pathname === '/home-page/schedule-builder' && <Outlet context={[scheduleData, setScheduleData, loading, setLoading ]}/>}
            </div>
            <div className='side-area'>
                <div className='side-area-top'>
                    <UpcomingDeadlines 
                    todoData={todoData} 
                    setTodoData={setTodoData}
                    username={props.username}
                    />
                </div>
                <div className="side-area-bottom">
                <CurrentEvent 
                    scheduleData={scheduleData} 
                    setScheduleData={setScheduleData}
                    username={props.username}
                    />
                </div>
                
            </div>
            
            
        </div>

        <div className='bottom-bar'>
            <button onClick={handleLogout}>Log out</button>
        </div>
        
    </div>
    );
}


export default HomePage;