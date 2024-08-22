import React from 'react';
import '../style/Home.css';
import Actions from './Actions';
import TasksList from './TaskList';
import AddTask from './AddTask';

/**
 * Home Component
 * 
 * The Home component serves as the main dashboard of the task management application.
 * It displays the title of the application, includes controls for filtering and searching tasks
 * through the Actions component, shows the list of tasks via the TasksList component, 
 * and provides a modal for adding new tasks through the AddTask component.
 */
function Home() {
    return (
        <div id="mainContainer">
            <h1 id="taskHeader">To Do List</h1>
            <Actions />
            <TasksList />
            <AddTask />
        </div>
    )
}

export default Home