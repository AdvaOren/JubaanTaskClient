import React, { useContext } from 'react';
import '../style/TasksList.css';
import { AuthContext } from '../AuthContext';
import { ReactComponent as DeleteIcon }  from '../assets/icons/deleteIcon.svg';
function TasksList() {
    const { tasksList, setEditTaskFun, setPopUpFun } = useContext(AuthContext);
    const editTask = (task) => {
        setEditTaskFun(task);
    }
    const deleteTask = (task) => {
        
    }
    return (
        <div className="tasksContainer">
            {tasksList && tasksList.length > 0 ?
                tasksList.map((task, indx) => (
                    <div key={indx} className="task" type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#taskModal"
                        onClick={() => editTask(task)}>
                        <div className='taskDetails'>
                            <div className='topTaskCard'>
                                <h2 className='details titleDet'>{task.title}</h2>
                                {/* <DeleteIcon id="deleteIcon" onClick={() => deleteTask(task)} /> */}
                            </div>
                            <p className='details'>{task.description}</p><br></br>
                            <p className='details'><span>Due Date:</span> {task.dueDate}</p>
                        </div><br></br>
                        <div className='taskStatus'>{task.status}</div>
                    </div>
                )) : <p className="noTasks">No tasks to show</p>}
        </div>
    )
}

export default TasksList