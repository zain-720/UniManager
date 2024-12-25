import React, { useState } from 'react';
import axios from "axios";
import { serverURL } from '../../App';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import './TodoList.css';
import { Pencil, Trash2, Check, X, Plus, Calendar } from 'lucide-react';
import SaveList from './TodoListComponents/SaveList';
import GetTodoListData from './TodoListComponents/GetTodoListData';
import AcquireTodoLock from './TodoListComponents/AcquireTodoLock';

function  TodoList(props){

    const [
        todoData, 
        setTodoData,
        loading, 
        setLoading
    ] = useOutletContext();

    const [newTodo, setNewTodo] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [editingKey, setEditingKey] = useState(null);
    const [editText, setEditText] = useState('');
    const [editDueDate, setEditDueDate] = useState('');
    
    //Add a new todo into the list
    const handleAddTodo  = async () => {
        if (newTodo.trim()) {

            // Acquire lock for todolist_data
            await AcquireTodoLock({username : props.username});

            // Acquire the latest todolist_data 
            const latestTodoData = await GetTodoListData(setTodoData, props.username);

            const newItem = {key: latestTodoData.key_number, text: (newTodo.trim()), dueDate: newDueDate, completed: false}
            const updatedTodoItems = insertTodoByDueDate(newItem, latestTodoData.items);
            const updatedTodoData = {...latestTodoData, items: updatedTodoItems, key_number: (latestTodoData.key_number+1)}
            setTodoData(updatedTodoData);
            setNewTodo('');
            setNewDueDate('');
            
            SaveList({username: props.username, todoData: updatedTodoData});
            
            //Release the lock
            await axios.post(serverURL + "/releaseTodoLock", { username: props.username });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        handleAddTodo();
        }
    };

    const startEditing = (todo) => {
        setEditingKey(todo.key);
        setEditText(todo.text);
        setEditDueDate(todo.dueDate);
    };

    const saveEdit = async (key) => {

        // Acquire lock for todolist_data
        await AcquireTodoLock({username : props.username});

        // Acquire the latest todolist_data 
        const latestTodoData = await GetTodoListData(setTodoData, props.username);

        const originalTodo = latestTodoData.items.find(todo => todo.key === key);

        if(!originalTodo){ // Key doesnt exist in list, meaning another user on the account deleted the item of this key

            //add the item back into the list 
            const newItem = {key: key, text: ((editText.trim())), dueDate: editDueDate, completed: false}
            const updatedTodoItems = insertTodoByDueDate(newItem, latestTodoData.items);
            const updatedTodoData = {...latestTodoData, items: updatedTodoItems}
            setTodoData(updatedTodoData);
            setEditingKey(null);
            setEditText('');
            setEditDueDate('');
            
            SaveList({username: props.username, todoData: updatedTodoData});
            
            //Release the lock
            await axios.post(serverURL + "/releaseTodoLock", { username: props.username });
        }
        else{ // Item is in latest list

            if(editDueDate !== originalTodo.dueDate){ //If date was changed delete old version of the note and add new one
                const sortedArray = latestTodoData.items.filter(todo => todo.key !== key);
                const newItem = {key: key, text: (editText.trim()), dueDate: editDueDate, completed: false}
                const updatedTodoItems = insertTodoByDueDate(newItem, sortedArray);
                const updatedTodoData = {...latestTodoData, items: updatedTodoItems}
                setTodoData(updatedTodoData);
                setEditingKey(null);
                setEditText('');
                setEditDueDate('');

                SaveList({username: props.username, todoData: updatedTodoData});

                //Release the lock
                await axios.post(serverURL + "/releaseTodoLock", { username: props.username });
            }
            else{ // No chnage to the date made
                const updatedTodoItems = latestTodoData.items.map(todo =>
                    todo.key === key ? { ...todo, text: (editText.trim()), dueDate: editDueDate } : todo);
                const updatedTodoData = {...latestTodoData, items: updatedTodoItems}
                setTodoData(updatedTodoData);
                setEditingKey(null);
                setEditText('');
                setEditDueDate('');

                SaveList({username: props.username, todoData: updatedTodoData});

                //Release the lock
                await axios.post(serverURL + "/releaseTodoLock", { username: props.username });
            }
        }
    };

    const cancelEdit = () => {
        setEditingKey(null);
        setEditText('');
        setEditDueDate('');
    };

    const deleteTodo = async (key) => {

        // Acquire lock for todolist_data
        await AcquireTodoLock({username : props.username});

        // Acquire the latest todolist_data 
        const latestTodoData = await GetTodoListData(setTodoData, props.username);

        const updatedTodoItems = latestTodoData.items.filter(todo => todo.key !== key);
        const updatedTodoData = {...latestTodoData, items: updatedTodoItems}
        setTodoData(updatedTodoData);

        SaveList({username: props.username, todoData: updatedTodoData});

        //Release the lock
        await axios.post(serverURL + "/releaseTodoLock", { username: props.username });

    };

    const toggleComplete = async (key) => {

        // Acquire lock for todolist_data
        await AcquireTodoLock({username : props.username});

        // Acquire the latest todolist_data 
        const latestTodoData = await GetTodoListData(setTodoData, props.username);

        const updatedTodoItems = latestTodoData.items.map(todo =>
        todo.key === key ? { ...todo, completed: !todo.completed } : todo
        )
        const updatedTodoData = {...latestTodoData, items: updatedTodoItems}
        setTodoData(updatedTodoData);

        SaveList({username: props.username, todoData: updatedTodoData});

        //Release the lock
        await axios.post(serverURL + "/releaseTodoLock", { username: props.username });

    };

    const clearCompleted = async () => {

        // Acquire lock for todolist_data
        await AcquireTodoLock({username : props.username});

        // Acquire the latest todolist_data 
        const latestTodoData = await GetTodoListData(setTodoData, props.username);

        const updatedTodoItems = latestTodoData.items.filter(todo => !todo.completed)
        const updatedTodoData = {...latestTodoData, items: updatedTodoItems}
        setTodoData(updatedTodoData);

        SaveList({username: props.username, todoData: updatedTodoData});

        //Release the lock
        await axios.post(serverURL + "/releaseTodoLock", { username: props.username });
    };

    const getUrgencyClass = (dueDate, completed) => {

        if(completed == true) return 'complete';

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
        const date = new Date(dateString + 'T00:00:00-05:00');
        return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
        });
    };

    const insertTodoByDueDate = (newItem, sortedArray) => {

        // Handle edge cases first
        if (sortedArray.length === 0) return [newItem];
        
        // If new todo has no due date, append to end since null dates go last
        if (!newItem.dueDate) return [...sortedArray, newItem];
    
        let left = 0;
        let right = sortedArray.length - 1;
        
        // Binary search for insertion point
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midItem = sortedArray[mid];
            
            // Handle null due dates in existing array
            if (!midItem.dueDate) {
                right = mid - 1;
                continue;
            }
            
            const comparison = new Date(newItem.dueDate) - new Date(midItem.dueDate);
            
            if (comparison === 0) {
                left = mid;
                break;
            } else if (comparison < 0) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        // Insert at the found position
        return [
            ...sortedArray.slice(0, left),
            newItem,
            ...sortedArray.slice(left)
        ];
    };

    const completedCount = todoData.items.filter(todo => todo.completed).length;

    return (
        <div className="todo-container">
        <h1 className="todo-title">Todo List</h1>
        
        <div className="todo-input-container">
            <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyPress}
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

        <ul className="todo-list">
            {todoData.items.map(todo => (
            <li
                key={todo.key}
                className={`todo-item ${getUrgencyClass(todo.dueDate, todo.completed)}`}
            >
                <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.key)}
                className="todo-checkbox"
                />
                {editingKey === todo.key ? (
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
                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
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
                        disabled={todo.completed}
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

        {completedCount > 0 && (
            <div className="clear-completed">
            <span>{completedCount} completed {completedCount === 1 ? 'item' : 'items'}</span>
            <button
                onClick={clearCompleted}
                className="clear-button"
            >
                Clear Completed
            </button>
            </div>
        )}

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
            <span className="legend-item">
                <div className="color-dot complete"></div> Complete
            </span>
            </div>
        </div>
        </div>
    );

};

export default TodoList;