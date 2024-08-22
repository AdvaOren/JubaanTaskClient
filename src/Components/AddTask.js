import React, { useContext, useState } from 'react';
import '../style/AddTask.css';
import { DescriptionValidation, DueDateValidation, StatusValidation, TitleValidation } from "./Validation";
import { createTask } from "../utils/TaskServiceCalls";
import { AuthContext } from '../AuthContext';
import { colors } from '../utils/variables';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import { ReactComponent as BackIcon } from '../assets/icons/backwardIcon.svg';


function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('ToDo');
    const [dueDate, setDueDate] = useState('');
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [dueDateError, setDueDateError] = useState("");
    const [statusError, setStatusError] = useState("");
    const { addItemToTasksList, tasksList } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (TitleValidation(title, setTitleError) &&
            DueDateValidation(dueDate, setDueDateError) &&
            StatusValidation(status, setStatusError)) {

            const task = { title: title, description: description, status: status, dueDate: dueDate };
            createTask(task).then(response => {
                addItemToTasksList({ ...response, dueDate: format(new Date(dueDate), 'dd/MM/yyyy'), color: colors[tasksList.length % colors.length] });
                navigate("/");
            }).catch(error => {
                console.error("Error saving task", error);
            });
        }
    };


    return (
        <div className='main-task-container'>
            <div className="task-form-container">
                <div className='new-task-header'>
                    <BackIcon className="closeIcon" onClick={() => navigate("/")} />
                    <h2>Add New Task</h2>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="taskTitle">Title:</label>
                        <input
                            type="text"
                            id="taskTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDescription">Description:</label>
                        <textarea
                            id="taskDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea><br />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskStatus">Status:</label>
                        <select
                            id="taskStatus"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="ToDo">To Do</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Done">Done</option>
                        </select><br />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDueDate">Due Date:</label>
                        <input
                            type="date"
                            id="taskDueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        /><br />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn-submit">Add Task</button>
                    <span style={{ color: 'red' }} className="error">{dueDateError}</span>
                    <span style={{ color: 'red' }} className="error">{statusError}</span>
                    <span style={{ color: 'red' }} className="error">{descriptionError}</span>
                    <span style={{ color: 'red', left: 0 }} className="error">{titleError}</span>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
