import React, { useState } from 'react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import './TodoList.css';
import { Pencil, Trash2, Check, X, Plus, Calendar } from 'lucide-react';

function  TodoList(props){

    const [
        note_data, 
        setNoteData,
        loading, 
        setLoading
      ] = useOutletContext();

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editDueDate, setEditDueDate] = useState('');
    const [newTodoText, setNewTodoText] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [completedTodos, setCompletedTodos] = useState([]); // Temporary storage for completed items

    const handleAddTodo = () => {
    if (newTodoText.trim()) {
        const newTodo = {
        key: note_data.todoList_key_number,
        item: newTodoText.trim(),
        dueDate: newDueDate
        };

        setNote_data(prev => ({
        ...prev,
        todoList_NoteArray: [...prev.todoList_NoteArray, newTodo],
        todoList_key_number: prev.todoList_key_number + 1
        }));

        setNewTodoText('');
        setNewDueDate('');
    }
    };

    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleAddTodo();
    }
    };

    const startEditing = (todo) => {
    setEditingId(todo.key);
    setEditText(todo.item);
    setEditDueDate(todo.dueDate || '');
    };

    const saveEdit = (key) => {
    setNote_data(prev => ({
        ...prev,
        todoList_NoteArray: prev.todoList_NoteArray.map(todo =>
        todo.key === key ? { ...todo, item: editText.trim(), dueDate: editDueDate } : todo
        )
    }));
    setEditingId(null);
    setEditText('');
    setEditDueDate('');
    };

    const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditDueDate('');
    };

    const deleteTodo = (key) => {
    setNote_data(prev => ({
        ...prev,
        todoList_NoteArray: prev.todoList_NoteArray.filter(todo => todo.key !== key)
    }));
    };

    const toggleComplete = (todo) => {
    // Add to completed items temporarily
    setCompletedTodos([...completedTodos, todo]);
    
    // Remove from todoList_NoteArray
    setNote_data(prev => ({
        ...prev,
        todoList_NoteArray: prev.todoList_NoteArray.filter(item => item.key !== todo.key)
    }));

    // Clear completed items after 3 seconds
    setTimeout(() => {
        setCompletedTodos(prev => prev.filter(item => item.key !== todo.key));
    }, 3000);
    };

    const getUrgencyClass = (dueDate) => {
    if (!dueDate) return 'no-date';
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'overdue';
    if (diffDays <= 2) return 'urgent';
    if (diffDays <= 7) return 'upcoming';
    return 'later';
    };

    const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    };

    // Sort todos by due date (null dates at the end)
    const sortedTodos = [...note_data.todoList_NoteArray].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return (
    <div className="todo-container">
        <h1 className="todo-title">Todo List for {username}</h1>
        
        <div className="todo-input-container">
        <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo"
            className="todo-input"
        />
        <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-button">
            <Plus size={16} />
            Add
        </button>
        </div>

        {/* Completed todos (temporary display) */}
        {completedTodos.length > 0 && (
        <div className="completed-items">
            {completedTodos.map(todo => (
            <div key={todo.key} className="completed-item">
                <span>✓ {todo.item}</span>
            </div>
            ))}
        </div>
        )}

        <ul className="todo-list">
        {sortedTodos.map(todo => (
            <li
            key={todo.key}
            className={`todo-item ${getUrgencyClass(todo.dueDate)}`}
            >
            <input
                type="checkbox"
                onChange={() => toggleComplete(todo)}
                className="todo-checkbox"
            />
            {editingId === todo.key ? (
                <>
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="todo-input"
                    autoFocus
                />
                <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="todo-input"
                />
                <button
                    onClick={() => saveEdit(todo.key)}
                    className="icon-button"
                >
                    <Check size={16} />
                </button>
                <button
                    onClick={cancelEdit}
                    className="icon-button delete"
                >
                    <X size={16} />
                </button>
                </>
            ) : (
                <>
                <span className="todo-text">
                    {todo.item}
                </span>
                {todo.dueDate && (
                    <span className="todo-date">
                    <Calendar size={14} />
                    {formatDate(todo.dueDate)}
                    </span>
                )}
                <div className="todo-actions">
                    <button
                    onClick={() => startEditing(todo)}
                    className="icon-button edit"
                    >
                    <Pencil size={16} />
                    </button>
                    <button
                    onClick={() => deleteTodo(todo.key)}
                    className="icon-button delete"
                    >
                    <Trash2 size={16} />
                    </button>
                </div>
                </>
            )}
            </li>
        ))}
        </ul>

        <div className="color-legend">
        <div className="legend-title">Due Date Colors:</div>
        <div className="legend-items">
            <span className="legend-item">
            <div className="color-dot overdue"></div> Overdue
            </span>
            <span className="legend-item">
            <div className="color-dot urgent"></div> Due in 2 days
            </span>
            <span className="legend-item">
            <div className="color-dot upcoming"></div> Due in 7 days
            </span>
            <span className="legend-item">
            <div className="color-dot later"></div> Due later
            </span>
        </div>
        </div>
    </div>
    );
};

export default TodoList;