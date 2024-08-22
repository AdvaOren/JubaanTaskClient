import React from 'react';
import '../style/Home.css';
import Actions from './Actions';
import TasksList from './TaskList';
import EditTask from './EditTask';

function Home() {
    return (
        <div id="mainContainer">
            <h1 id="taskHeader">To Do List</h1>
            <Actions />
            <TasksList />
            <EditTask />
        </div>
    )
}

export default Home