import React, { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';
import GetScheduleData from './GetScheduleData';
import './CurrentEvent.css';

const CurrentEvent = ({ scheduleData, setScheduleData, username }) => {
    const [currentTask, setCurrentTask] = useState(null);
    const [nextTask, setNextTask] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '' });

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const getCurrentTimeInfo = () => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const currentDayIndex = now.getDay();
        return { 
            minutes: currentMinutes, 
            dayIndex: currentDayIndex === 0 ? 6 : currentDayIndex - 1 
        };
    };

    const findCurrentAndNextTask = (latestScheduleData) => {
        const { minutes, dayIndex } = getCurrentTimeInfo();
        const todaysTasks = latestScheduleData.schedule[dayIndex] || [];
        
        // Find current task
        const current = todaysTasks.find(task => {
            const startMinutes = timeToMinutes(task.start_time);
            const endMinutes = timeToMinutes(task.end_time);
            return minutes >= startMinutes && minutes < endMinutes;
        });

        // Find next task
        const next = todaysTasks.find(task => {
            const startMinutes = timeToMinutes(task.start_time);
            return minutes < startMinutes;
        });

        setCurrentTask(current || null);
        setNextTask(next || null);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const latestScheduleData = await GetScheduleData(setScheduleData, username);
            findCurrentAndNextTask(latestScheduleData);
          } catch (error) {
            console.error('Error fetching schedule data:', error);
          }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        
            const timer = setInterval( async() => {
                
                setCurrentTime(new Date());
                //console.log("minute passed");
                const latestScheduleData = await GetScheduleData(setScheduleData, username);

                findCurrentAndNextTask(latestScheduleData);
            }, 60000);

            return () => clearInterval(timer);
    }, []);

    const handleTextClick = (title, content) => {
        setModalContent({ title, content });
        setShowModal(true);
    };

    const renderTaskCard = (task, label) => (
        <div className="task-card">
            <div className="task-header">
                <Clock className="clock-icon" />
                <h3>{label}</h3>
            </div>
            <div className="task-details">
                <h2 
                    className="truncate-text"
                    onClick={() => handleTextClick('Task', task.task)}
                >
                    {task.task}
                </h2>
                {task.location && (
                    <p 
                        className="location truncate-text"
                        onClick={() => handleTextClick('Location', task.location)}
                    >
                        <MapPin className="location-icon" />
                        {task.location}
                    </p>
                )}
                <p className="time">
                    {task.start_time} - {task.end_time}
                </p>
            </div>
        </div>
    );

    if (!currentTask && !nextTask) {
        return (
            <div className="current-task-container">
                <div className="no-task-card">
                    
                    <div className="no-task-content">
                        <Clock className="clock-icon" />
                        <h3>No Upcoming Tasks For Today</h3>
                        <p>Free Time</p>
                    </div>
                </div>
            </div>
        );
    }
    else if(nextTask && !currentTask){
        return (<div className="current-task-container">
            {nextTask && renderTaskCard(nextTask, "Next Task For Today")}
            

            {/* Text Detail Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{modalContent.title}</h3>
                            <button 
                                className="close-button"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{modalContent.content}</p>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>);
    }
    //{nextTask && renderTaskCard(nextTask, "Next Task")} Incoperate next task space in future update
    return (
        <div className="current-task-container">
            {currentTask && renderTaskCard(currentTask, "Current Task")}
            

            {/* Text Detail Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{modalContent.title}</h3>
                            <button 
                                className="close-button"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{modalContent.content}</p>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentEvent;