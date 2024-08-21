// React and Hooks
import React, { useState } from 'react';

// Contexts
const AuthContext = React.createContext();


function AuthProvider({ children }) {
    const [tasksList, setTasksList] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [popUp, setPopUp] = useState(false);
    // Setters functions
    const setTasksListFun = (newList) => { setTasksList(newList); };
    const setEditTaskFun = (val) => {setEditTask(val); };
    const setPopUpFun = (val) => { setPopUp(val); };

    /**
     * addItemToTasksList
     * Adds a new item to the tasks list.
     * @param {object} newItem - The new item to be added to the favorite list.
     */
    const addItemToTasksList = (newItem) => {
        if (tasksList.length === 0) {
            setTasksList([newItem]);
            return;
        }
        setTasksList((prevTasksList) => [...prevTasksList, newItem]);
    };

    

    /**
     * deleteTaskFromList
     * Removes an item from the tasks list by ID.
     * @param {number} id - The ID of the item to be removed.
     */
    const deleteTaskFromList = (id) => {
        setTasksList((prevTasksList) => prevTasksList.filter((item) => item.id !== id));
    }

    return (
        <AuthContext.Provider value={{
            tasksList,
            setTasksListFun,
            addItemToTasksList,
            deleteTaskFromList,
            setEditTaskFun,
            editTask,
            setPopUpFun,
            popUp
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthProvider, AuthContext };