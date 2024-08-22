import { useContext, useEffect, useRef, useState } from "react";
import "../style/AddTask.css";
import { AuthContext } from "../AuthContext";
import { deleteTaskServer, updateTask } from "../utils/TaskServiceCalls";
import { DueDateValidation, StatusValidation, TitleValidation } from "./Validation";
import { colorsForModal } from "../utils/variables";
import { convertDateFormat, DateConverter, isValidDateFormat } from "../utils/DateConverter";
import { format } from "date-fns";
import { ReactComponent as BackIcon } from '../assets/icons/backwardIcon.svg';
import { useNavigate } from 'react-router';


function AddTask() {
    const { editTask, deleteTaskFromList, updateItemInTasksList } = useContext(AuthContext);
    const [task, setTask] = useState(editTask || {
        title: "",
        description: "",
        dueDate: "",
        status: "ToDo"
    });
    const [changed, setChanged] = useState(false);

    const [titleError, setTitleError] = useState("");
    const [dueDateError, setDueDateError] = useState("");
    const [statusError, setStatusError] = useState("");
    const [updateDueDate, setUpdateDueDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (editTask != null) {
            setUpdateDueDate(convertDateFormat(editTask.dueDate));
            setTask(editTask);
        } else {
            setTask({ title: "", description: "", dueDate: "", status: "ToDo" });
        }
    }, [editTask]);


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
            if (!isValidDateFormat(updateDueDate)) {
                setUpdateDueDate(DateConverter(updateDueDate));
                setTask({ ...task, dueDate: updateDueDate });
            }
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
            <div className="task-form-container" style={task && { backgroundColor: colorsForModal[task.color]?.["modal-body"] }}>
                <div className='new-task-header'
                    style={task && { backgroundColor: colorsForModal[task.color]?.["modal-footer"] }}>
                    <BackIcon className="closeIcon" onClick={() => navigate("/")} />
                    <h2>Edit Task</h2>
                </div>
                <form onSubmit={handleSubmit}
                    style={task && { backgroundColor: colorsForModal[task.color]?.["modal-body"] }}>
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
                    <div className="form-group">
                        <label htmlFor="taskDescription">Description:</label>
                        <textarea
                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                            id="taskDescription"
                            value={task.description}
                            onChange={(e) => handleDescriptionChange(e)}
                        ></textarea><br />
                    </div>
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
                    <div className="btn-container">
                        <button onClick={deleteTask} type="button" className="btn-delete">Delete Task</button>
                        <button onClick={handleSubmit} type="submit" className="btn-submit">Save Task</button>
                    </div>

                    <span style={{ color: 'red' }} className="error">{dueDateError}</span>
                    <span style={{ color: 'red' }} className="error">{statusError}</span>
                    <span style={{ color: 'red' }} className="error">{titleError}</span>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
