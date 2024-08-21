import React, { useContext } from 'react';
import '../style/Home.css';
import Actions from './Actions';
import TasksList from './TaskList';
import EditOrCreate from './EditOrCreate';
import { AuthContext } from '../AuthContext';
import PopUp from './PopUp';

function Home() {
    const { popUp } = useContext(AuthContext);
    return (
        <div id="mainContainer">
            <h1 id="taskHeader">To Do List</h1>
            <Actions />
            <TasksList />
            <EditOrCreate />
            {popUp && <PopUp text="Are you sure you want to delete the task?" />}
        </div>
    )
}

export default Home