// React and Hooks
import React, { useState } from 'react';
import { Sort } from './utils/Sort';

// Contexts
const AuthContext = React.createContext();


function AuthProvider({ children }) {
    const [tasksList, setTasksList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [currFilter, setCurrFilter] = useState('Date');


    // Setters functions
    const setTasksListFun = (newList) => { setTasksList(newList); };
    const setEditTaskFun = (val) => {setEditTask(val); };
    const setFilteredListFun = (newList) => { setFilteredList(newList); };

    /**
     * addItemToTasksList
     * Adds a new item to the tasks list.
     * @param {object} newItem - The new item to be added to the favorite list.
     */
    const addItemToTasksList = (newItem) => {
        if (tasksList.length === 0) {
            setTasksList([newItem]);
            setFilteredList([newItem]);
            return;
        }
        setTasksList((prevTasksList) => [...prevTasksList, newItem]);
        let updatedList = [...filteredList, newItem];
        setFilteredList(Sort(currFilter, updatedList));
    };

    

    /**
     * deleteTaskFromList
     * Removes an item from the tasks list by ID.
     * @param {number} id - The ID of the item to be removed.
     */
    const deleteTaskFromList = (id) => {
        setTasksList((prevTasksList) => prevTasksList.filter((item) => item.id !== id));
        setFilteredList((prevFilteredList) => prevFilteredList.filter((item) => item.id !== id));
    }

    /**
     * updateItemInTasksList
     * 
     * Updates an existing task in both the tasks list and filtered list.
     * 
     * @param {object} updatedItem - The task object with updated details.
     */
    const updateItemInTasksList = (updatedItem) => {
        setTasksList((prevTasksList) => prevTasksList.map((item) => item.id === updatedItem.id ? updatedItem : item));
        let updatedList = filteredList.map((item) => item.id === updatedItem.id ? updatedItem : item);
        setFilteredList(Sort(currFilter, updatedList));
    }

    return (
        <AuthContext.Provider value={{
            tasksList,
            setTasksListFun,
            addItemToTasksList,
            deleteTaskFromList,
            setEditTaskFun,
            editTask,
            updateItemInTasksList,
            filteredList,
            setFilteredList,
            setFilteredListFun,
            currFilter,
            setCurrFilter
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthProvider, AuthContext };