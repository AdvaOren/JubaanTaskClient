import { useContext, useEffect, useState } from "react";
import { ReactComponent as BackIcon } from '../assets/icons/backwardIcon.svg';
import { format } from "date-fns";
import { useNavigate } from 'react-router';
import { AuthContext } from "../AuthContext";
import { deleteTaskServer, updateTask } from "../utils/TaskServiceCalls";
import { DueDateValidation, StatusValidation, TitleValidation } from "./Validation";
import { colorsForModal } from "../utils/variables";
import { convertDateFormat, DateConverter, isValidDateFormat } from "../utils/DateConverter";
import "../style/EditTask.css";

/**
 * EditTask Component
 * 
 * This component is responsible for rendering a form that allows users to edit tasks.
 * The form includes inputs for the task's title, description, due date, and status. 
 * Users can also delete a task or save their changes. The component handles validation, 
 * state management, and communicates with a backend service to update or delete tasks.
 */
function EditTask() {
    const { editTask, deleteTaskFromList, updateItemInTasksList } = useContext(AuthContext);
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();

    // State to hold task data; if editTask exists, use it, otherwise initialize with default values
    const [task, setTask] = useState(editTask || {
        title: "",
        description: "",
        dueDate: "",
        status: "ToDo"
    });


    // States to hold error messages for validation
    const [titleError, setTitleError] = useState("");
    const [dueDateError, setDueDateError] = useState("");
    const [statusError, setStatusError] = useState("");
    const [updateDueDate, setUpdateDueDate] = useState("");

    useEffect(() => {
        if (editTask != null) {
            setUpdateDueDate(convertDateFormat(editTask.dueDate));
            setTask(editTask);
        } else {
            setTask({ title: "", description: "", dueDate: "", status: "ToDo" });
        }
    }, [editTask]);


    // Handlers to manage changes to form inputs and update state accordingly
    const handleTitleChange = (e) => {
        setChanged(true);
        setTask({ ...task, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setChanged(true);
        setTask({ ...task, description: e.target.value });
    };

    const handleDueDateChange = (e) => {
        setChanged(true);
        setUpdateDueDate(e.target.value);
        setTask({ ...task, dueDate: e.target.value });
    };

    const handleStatusChange = (e) => {
        setChanged(true);
        setTask({ ...task, status: e.target.value });
    };


    const resetErrors = () => {
        setTitleError("");
        setDueDateError("");
        setStatusError("");
    };


    const handleSubmit = () => {
        if (changed && task && TitleValidation(task.title, setTitleError) && DueDateValidation(updateDueDate, setDueDateError) && StatusValidation(task.status, setStatusError)) {
            // If the date format is invalid, convert it
            if (!isValidDateFormat(updateDueDate)) {
                setUpdateDueDate(DateConverter(updateDueDate));
                setTask({ ...task, dueDate: updateDueDate });
            }
            // Update the task on the server and in the task list
            updateTask({ ...task, dueDate: updateDueDate }).then(() => {
                updateItemInTasksList({ ...task, dueDate: format(new Date(updateDueDate), 'dd/MM/yyyy') });
            }).catch(error => {
                console.error("Error updating task", error);
            });
        }
        resetErrors();
        navigate('/');
    };

    const deleteTask = async () => {
        try {
            if (editTask) {
                // Delete task from the server and update the task list
                await deleteTaskServer(editTask);
                deleteTaskFromList(task.id);
                navigate('/');
            }
        } catch (error) {
            console.error("Error deleting task", error)
        }
    };


    return (
        <div className='main-task-container'>
            {/* Main container for the task form */}
            <div className="task-form-container" style={task && { backgroundColor: colorsForModal[task.color]?.["modal-body"] }}>

                {/* Header section with back icon and title */}
                <div className='new-task-header'
                    style={task && { backgroundColor: colorsForModal[task.color]?.["modal-footer"] }}>
                    <BackIcon className="closeIcon" onClick={() => navigate("/")} />
                    <h2>Edit Task</h2>
                </div>

                {/* Form for editing or adding a task */}
                <form onSubmit={handleSubmit}
                    style={task && { backgroundColor: colorsForModal[task.color]?.["modal-body"] }}>

                    {/* Input for task title */}
                    <div className="form-group">
                        <label htmlFor="taskTitle">Title:</label>
                        <input
                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                            type="text"
                            id="taskTitle"
                            value={task.title}
                            onChange={(e) => handleTitleChange(e)}
                            required
                        />
                    </div>

                    {/* Textarea for task description */}
                    <div className="form-group">
                        <label htmlFor="taskDescription">Description:</label>
                        <textarea
                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                            id="taskDescription"
                            value={task.description}
                            onChange={(e) => handleDescriptionChange(e)}
                        ></textarea><br />
                    </div>

                    {/* Input for task due date */}
                    <div className="form-group">
                        <label htmlFor="taskDueDate">Due Date:</label>
                        <input
                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                            type="date"
                            id="taskDueDate"
                            value={updateDueDate}
                            onChange={(e) => handleDueDateChange(e)}
                            required
                        /><br />
                    </div>

                    {/* Select dropdown for task status */}
                    <div className="form-group">
                        <label htmlFor="taskStatus">Status:</label>
                        <select
                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                            id="taskStatus"
                            value={task.status}
                            onChange={(e) => handleStatusChange(e)}
                            required
                        >
                            <option value="ToDo">To Do</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Done">Done</option>
                        </select><br />
                    </div>

                    {/* Container for the form buttons */}
                    <div className="btn-container">
                        <button onClick={deleteTask} type="button" className="btn-delete">Delete Task</button>
                        <button onClick={handleSubmit} type="submit" className="btn-submit">Save Task</button>
                    </div>

                    {/* Display error messages if validation fails */}
                    <span style={{ color: 'red' }} className="error">{dueDateError}</span>
                    <span style={{ color: 'red' }} className="error">{statusError}</span>
                    <span style={{ color: 'red' }} className="error">{titleError}</span>
                </form>
            </div>
        </div>
    );
}

export default EditTask;
