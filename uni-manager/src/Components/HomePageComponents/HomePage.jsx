import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { serverURL } from '../../App';
import { Menu } from 'lucide-react';
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

    // For extra menu bar
    const [isSmallWidth, setWidth] = useState(window.innerWidth < 445);
    const [isSuperSmallWidth, setSuperSmallWidth] = useState(window.innerWidth > 230);
    const [isOpen, setIsOpen] = useState(false);

    // Homepage navigation helpers 

    //Handle logout
    const handleLogout = () => {
        props.logout();
        setNoteData(null);
        setTodoData(null);
        setScheduleData(null);
        navigate('/home-page');
    }

    // Handle start up of child application
    const handleFunctionStart = async (GetData, setData, route) => {
        setLoading(true);  
        await GetData(setData, props.username);
        setLoading(false);
        navigate(route);
    };

    // Get the current width of the page tracks 2 widths 
    const useWindowWidth = () => {
        
        useEffect(() => {
            const handleResize = () => {
                setWidth(window.innerWidth < 445);
                setSuperSmallWidth(window.innerWidth > 230)
            };
        
            window.addEventListener('resize', handleResize);
        
            return () => window.removeEventListener('resize', handleResize);
        }, []); 
        
        return [isSmallWidth, isSuperSmallWidth]; // This value updates on every resize
    };

    const [width, smallerWidth] = useWindowWidth();
    return(
    <div className='home-page'>
        
        {/* Display app buttons here */}
        <div className='top-bar'>
            {width ? 
            (<div className="small-menu-container-grid">
                {smallerWidth && (<h1>Welcome</h1>)}
                <button 
                    className="menu-button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={24} />
                </button>
                
                {isOpen && (
                    <div className="dropdown-menu">
                        <button onClick={() => {
                            setIsOpen(false);
                            handleFunctionStart(GetNoteData, setNoteData, '/home-page/note-taker');
                        }}>Note Taker</button>

                        <button onClick={() => {
                            setIsOpen(false);
                            handleFunctionStart(GetTodoListData, setTodoData, '/home-page/todo-list');
                        }}>Todo List</button>
                        
                        <button onClick={() => {
                            setIsOpen(false);
                            handleFunctionStart(GetScheduleData, setScheduleData, '/home-page/schedule-builder');
                        }}>Weekly Schedule</button>
                    </div>
                )}
            </div>
            ) 
            : 
            (<div className='top-bar-grid'>
                <div className='top-bar-main-app-grid'>
                    <h1>Welcome</h1>    
                    <button onClick={() => handleFunctionStart(GetNoteData, setNoteData, '/home-page/note-taker')}>Note Taker</button>
                    <button onClick={() => handleFunctionStart(GetTodoListData, setTodoData, '/home-page/todo-list')}>Todo List</button>
                    <button onClick={() => handleFunctionStart(GetScheduleData, setScheduleData, '/home-page/schedule-builder')}>Weekly Schedule</button>
                </div>
                <div>
                    <h4></h4>
                </div>
            </div> ) }
               
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