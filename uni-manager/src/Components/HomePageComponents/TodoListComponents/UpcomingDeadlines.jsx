import React, { useEffect, useState } from 'react';
import { Calendar, X } from 'lucide-react';
import './UpcomingDeadlines.css';
import GetTodoListData from './GetTodoListData';

const UpcomingDeadlines = ({ todoData, setTodoData, username }) => {
    const [selectedTodo, setSelectedTodo] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await GetTodoListData(setTodoData, username);
        } catch (error) {
          console.error('Error fetching todo data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    // Return early if todoData is not yet loaded
    if (!todoData?.items) {
      return (
        <div className="upcoming-deadlines-container">
          <div className="upcoming-deadlines-header">
            <h2 className="upcoming-deadlines-title">Top 10 Upcoming Deadlines</h2>
          </div>
          <div className="upcoming-deadlines-content">
            <p className="loading-text">Loading deadlines...</p>
          </div>
        </div>
      );
    }
  
    const getUrgencyClass = (dueDate, complete) => {
        
        if (complete == true) return 'text-complete';

        if (!dueDate) return 'text-normal';
        const today = new Date();
        const due = new Date(dueDate);
        const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
        if (diffDays < 0) return 'text-overdue';
        if (diffDays <= 2) return 'text-urgent';
        if (diffDays <= 7) return 'text-upcoming';
        return 'text-later';
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString + 'T00:00:00-05:00');
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };
  
    // Filter incomplete todos with due dates and sort by closest deadline
    const upcomingDeadlines = todoData.items.slice(0, 10);
  
    return (
      <div className="upcoming-deadlines-container">
        <div className="upcoming-deadlines-header">
          <h2 className="upcoming-deadlines-title">Top 10 Upcoming Deadlines</h2>
        </div>
        <div className="upcoming-deadlines-content">
          {upcomingDeadlines.length > 0 ? (
            <ul className="deadlines-list">
              {upcomingDeadlines.map(todo => (
                <li 
                  key={todo.key}
                  className="deadline-item"
                  onClick={() => setSelectedTodo(todo)}
                >
                  <span className="deadline-text">
                    {todo.text}
                  </span>
                  <span className={`deadline-date ${getUrgencyClass(todo.dueDate, todo.completed)}`}>
                    <Calendar size={12} className="calendar-icon" />
                    {formatDate(todo.dueDate)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-deadlines-text">
              No upcoming deadlines
            </p>
          )}
        </div>
  
        {selectedTodo && (
          <div className="popup-overlay" onClick={() => setSelectedTodo(null)}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
              <button 
                className="popup-close"
                onClick={() => setSelectedTodo(null)}
              >
                <X size={16} />
              </button>
              <div className="popup-text">{selectedTodo.text}</div>
              <div className={`popup-date ${getUrgencyClass(selectedTodo.dueDate, selectedTodo.completed)}`}>
                Due: {formatDate(selectedTodo.dueDate)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default UpcomingDeadlines;