import React, { useContext } from 'react';
import '../style/TasksList.css';
import { AuthContext } from '../AuthContext';

function TasksList() {
    const { filteredList, setEditTaskFun, setPopUpFun } = useContext(AuthContext);
    // Define an array of color options
    const colors = [ "#FFB3BA", // Light Pink
        "#FFDFBA", // Light Orange
        "#FFFFBA", // Light Yellow
        "#BAFFC9", // Light Green
        "#BAE1FF", // Light Blue
        "#E0BBE4", // Light Purple
        "#FFB3E1", // Light Magenta
        "#FFC3A0", // Peach
        "#FFFACD", // Lemon Chiffon
        "#FFD1DC", // Light Coral
        ];

    const editTask = (task) => {
        setEditTaskFun(task);
    }

    return (
        <div className="tasksContainer">
        {filteredList && filteredList.length > 0 ?
            filteredList.map((task, indx) => {
                // Randomly select a color from the array
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                return (
                    <div key={indx} className="task" type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#taskModal"
                        onClick={() => editTask(task)}
                        style={{ backgroundColor: randomColor }} // Apply the random background color
                    >
                        <div className='taskDetails'>
                            <div className='topTaskCard'>
                                <h2 className='details titleDet'>{task.title}</h2>
                            </div>
                            <p className='details'>{task.description}</p><br></br>
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