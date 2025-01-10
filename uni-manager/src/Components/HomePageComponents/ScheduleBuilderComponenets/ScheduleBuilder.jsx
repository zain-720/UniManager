import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Clock, Plus, Trash2 } from 'lucide-react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import './ScheduleBuilder.css';
import SaveSchedule from './SaveSchedule';

import { serverURL } from '../../../App';
import GetScheduleData from './GetScheduleData';
import AcquireScheduleLock from './AcquireScheduleLock';

const ScheduleBuilder = (props) => {
    // Initialize schedule with 7 empty arrays (one for each day)

    const [
            scheduleData, 
            setScheduleData,
            loading, 
            setLoading
        ] = useOutletContext();

    const [newEntry, setNewEntry] = useState({
      task: '',
      location: '',
      start_time: '',
      end_time: '',
      dayIndex: 0 // 0-6 representing Monday-Sunday
    });


    const [selectedDay, setSelectedDay] = useState(null);
  
    const days = [
      'Monday',    // index 0
      'Tuesday',   // index 1
      'Wednesday', // index 2
      'Thursday',  // index 3
      'Friday',    // index 4
      'Saturday',  // index 5
      'Sunday'     // index 6
    ];
  
    const timeSlots = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      return `${hour}:00`;
    });
  
    //Changes the values of the current input
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewEntry(prev => ({...prev, [name]: name === 'dayIndex' ? parseInt(value) : value}));
    };
    
    // To the minute conversion for later schedule by minutes update
    const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };
    
    // Check if two time ranges overlap
    const isOverlapping = (existingEntry, newEntry) => {
        const existingStart = timeToMinutes(existingEntry.start_time);
        const existingEnd = timeToMinutes(existingEntry.end_time);
        const newStart = timeToMinutes(newEntry.start_time);
        const newEnd = timeToMinutes(newEntry.end_time);
    
        // Check if either start or end time of new entry falls within an existing entry's time range
        return (newStart >= existingStart && newStart < existingEnd) || 
               (newEnd > existingStart && newEnd <= existingEnd) ||
               (newStart <= existingStart && newEnd >= existingEnd);
    };

    const binaryInsert = (array, entry) => {
        let left = 0;
        let right = array.length - 1;
    
        // Find insertion point
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (array[mid].start_time === entry.start_time) {
                left = mid;
                break;
            }
            if (array[mid].start_time < entry.start_time) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    
        // Insert at the correct position
        array.splice(left, 0, entry);
        return array;
    };

    //Adds the entry to the schedule
    const addScheduleEntry = async () => {

        // Acquire lock for schedule_data
        await AcquireScheduleLock({username : props.username});

        // Acquire the latest schedule_data
        const latestScheduleData = await GetScheduleData(setScheduleData, props.username);

        if (!newEntry.task || !newEntry.start_time || !newEntry.end_time) {
            alert('Please fill in all required fields');
            return;
        }

        // Check if end time is after start time
        if (timeToMinutes(newEntry.end_time) <= timeToMinutes(newEntry.start_time)) {
            alert('End time must be after start time');
            return;
        }
    
        const entry = {
            ...newEntry,
            key: latestScheduleData.key_number
        };

        // Check for overlaps with existing entries
        let i = 0;
        let hasOverlap = false;

        const daySchedule = latestScheduleData.schedule[entry.dayIndex];

        while (i < daySchedule.length && timeToMinutes(daySchedule[i].start_time) < timeToMinutes(entry.end_time)) {
            if (isOverlapping(daySchedule[i], entry)) {
                hasOverlap = true;
                break;
            }
            i++;
        }

        i = 0;
        if (hasOverlap) {
            alert('This time slot overlaps with an existing entry. Please choose a different time.');
            return;
        }
        
        // Insert into array using binary sort
        const newSchedule = latestScheduleData.schedule;
        newSchedule[entry.dayIndex] = binaryInsert([...newSchedule[entry.dayIndex]], entry);

        // Save the new data
        const updatedScheduleData = {...latestScheduleData, schedule : newSchedule, key_number: (latestScheduleData.key_number+1)};
        setScheduleData(updatedScheduleData);
        SaveSchedule({username: props.username, scheduleData: updatedScheduleData});
        
        // Reset form
        setNewEntry({
            task: '',
            location: '',
            start_time: '',
            end_time: '',
            dayIndex: 0
        });

        //Release the lock
        await axios.post(serverURL + "/releaseScheduleLock", { username: props.username });

    };
  
    const deleteEntry = async (dayIndex, key) => {

        // Acquire lock for schedule_data
        await AcquireScheduleLock({username : props.username});

        // Acquire the latest schedule_data
        const latestScheduleData = await GetScheduleData(setScheduleData, props.username);

        const newSchedule = latestScheduleData.schedule;
        newSchedule[dayIndex] = newSchedule[dayIndex].filter(entry => entry.key !== key);
        const updatedScheduleData = {...latestScheduleData, schedule : newSchedule};

        setScheduleData(updatedScheduleData);
        SaveSchedule({username: props.username, scheduleData: updatedScheduleData});
    };

    // Modal for day view
    const DayModal = ({ dayIndex, onClose }) => {
        if (dayIndex === null) return null;
    }
  
    return (
        <div className="schedule-builder">
            <div className="schedule-container">
            <div className="schedule-title">
                <Clock className="clock-icon" />
                <h2>Weekly Schedule Builder</h2>
            </div>
            <h3>* is required</h3>
    
            {/* Add New Entry Form */}
            <div className="form-grid">
                <div className="form-group">
                <label>Task*</label>
                <input
                    type="text"
                    name="task"
                    value={newEntry.task}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className="form-group">
                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    value={newEntry.location}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <label>Day*</label>
                <select
                    name="dayIndex"
                    value={newEntry.dayIndex}
                    onChange={handleInputChange}
                >
                    {days.map((day, index) => (
                    <option key={day} value={index}>{day}</option>
                    ))}
                </select>
                </div>
                <div className="form-group">
                <label>Start Time*</label>
                <select
                    name="start_time"
                    value={newEntry.start_time}
                    onChange={handleInputChange}
                >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                </div>
                <div className="form-group">
                <label>End Time*</label>
                <select
                    name="end_time"
                    value={newEntry.end_time}
                    onChange={handleInputChange}
                >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                </div>
                <div className="form-group button-container">
                <button
                    onClick={addScheduleEntry}
                    className="add-button"
                >
                    <Plus className="plus-icon" />
                    Add Entry
                </button>
                </div>
            </div>
    
            {/* Weekly Schedule Grid */}
            <div className="schedule-grid">
            {days.map((day, dayIndex) => (
                <div key={day} className="day-card" onClick={() => setSelectedDay(dayIndex)}>
                <h3 className="day-title">{day}</h3>
                <p className="task-count">
                    {scheduleData.schedule[dayIndex].length === 0 
                    ? "No tasks" 
                    : `${scheduleData.schedule[dayIndex].length} task${scheduleData.schedule[dayIndex].length === 1 ? '' : 's'}`}
                </p>
                </div>
            ))}

            {/* Task Modal */}
            {selectedDay !== null && (
                <div className="modal-overlay" onClick={() => setSelectedDay(null)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                    <h2>{days[selectedDay]}'s Schedule</h2>
                    <button className="close-button" onClick={() => setSelectedDay(null)}>×</button>
                    </div>
                    <div className="modal-body">
                    {scheduleData.schedule[selectedDay].length === 0 ? (
                        <p className="no-tasks">No tasks scheduled</p>
                    ) : (
                        scheduleData.schedule[selectedDay].map(entry => (
                        <div key={entry.key} className="task-card">
                            <div className="task-content">
                            <div>
                                <p className="task-name">{entry.task}</p>
                                {entry.location && (
                                <p className="task-location">{entry.location}</p>
                                )}
                                <p className="task-time">
                                {entry.start_time} - {entry.end_time}
                                </p>
                            </div>
                            <button
                                onClick={() => deleteEntry(selectedDay, entry.key)}
                                className="delete-button"
                            >
                                <Trash2 className="trash-icon" />
                            </button>
                            </div>
                        </div>
                        ))
                    )}
                    </div>
                </div>
                </div>
            )}
            </div>

            </div>
        </div>
    );
  };
  
  export default ScheduleBuilder;