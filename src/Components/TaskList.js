import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import '../style/TasksList.css';
import { AuthContext } from '../AuthContext';

/**
 * TasksList Component
 * 
 * The TasksList component is responsible for displaying the list of tasks filtered
 * according to the current criteria set in the application. Each task is rendered as
 * a clickable card that shows the task's title, a truncated description, and due date.
 * When a task is clicked, the user is navigated to the task editing page. If no tasks
 * are available, a message is displayed indicating that there are no tasks to show.
 */
function TasksList() {
    const { filteredList, setEditTaskFun } = useContext(AuthContext);
    const navigate = useNavigate();

    // Function to truncate the description of a task
    const description = (desc) => {
        if (desc.length > 40) {
            return desc.substring(0, 40) + '...';
        }
        return desc;
    }

    const editTask = (task) => {
        setEditTaskFun(task);
        navigate('/edit-task')
    }

    return (
        <div className="tasksContainer">
            {filteredList && filteredList.length > 0 ?
                filteredList.map((task, indx) => {
                    return (
                        <div key={indx} className="task" type="button"
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