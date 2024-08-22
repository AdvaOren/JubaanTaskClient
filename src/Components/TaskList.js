import React, { useContext } from 'react';
import '../style/TasksList.css';
import { AuthContext } from '../AuthContext';

function TasksList() {
    const { filteredList, setEditTaskFun } = useContext(AuthContext);

    const description = (desc) => {
        if (desc.length > 40) {
            return desc.substring(0, 40) + '...';
        }
        return desc;
    }

    const editTask = (task) => {
        setEditTaskFun(task);
    }

    return (
        <div className="tasksContainer">
            {filteredList && filteredList.length > 0 ?
                filteredList.map((task, indx) => {
                    return (
                        <div key={indx} className="task" type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#taskModal"
                            onClick={() => editTask(task)}
                            style={{ backgroundColor: task.color }}
                        >
                            <div className='taskDetails'>
                                <div className='topTaskCard'>
                                    <h2 className='details titleDet'>{task.title}</h2>
                                </div>
                                <p className='details'>{description(task.description)}</p><br></br>
                                <p className='details'><span>Due Date:</span> {task.dueDate}</p>
                            </div><br></br>
                            <div className='taskStatus'>{task.status}</div>
                        </div>
                    );
                }) : <p className="noTasks">No tasks to show</p>}
        </div>
    )
}

export default TasksList