import { useContext, useEffect, useRef, useState } from "react";
import "../style/EditTask.css";
import { AuthContext } from "../AuthContext";
import { deleteTaskServer, updateTask } from "../utils/TaskServiceCalls";
import { DueDateValidation, StatusValidation, TitleValidation } from "./Validation";
import { colorsForModal } from "../utils/variables";
import { convertDateFormat, DateConverter, isValidDateFormat } from "../utils/DateConverter";
import { format } from "date-fns";

let updateDueDate = ""

function EditTask() {
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
    const buttonRef = useRef(null);

    useEffect(() => {
        if (editTask != null) {
            setTask(editTask);
            updateDueDate = convertDateFormat(editTask.dueDate);
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
        updateDueDate = e.target.value;
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


    const handleTaskChanged = () => {
        if (changed && task && TitleValidation(task.title, setTitleError) && DueDateValidation(updateDueDate, setDueDateError) && StatusValidation(task.status, setStatusError)) {
            if (!isValidDateFormat(updateDueDate)) {
                updateDueDate = DateConverter(updateDueDate);
                setTask({ ...task, dueDate: updateDueDate });
            }
            updateTask({ ...task, dueDate: updateDueDate }).then(() => {
                updateItemInTasksList({ ...task, dueDate: format(new Date(updateDueDate), 'dd/MM/yyyy') });
            }).catch(error => {
                console.error("Error updating task", error);
            });
        }
        resetErrors();
        // Close the modal
        buttonRef.current.click();
        return () => {
            buttonRef.current.removeEventListener('click');
        };
    };

    const deleteTask = async () => {
        try {
            if (editTask) {
                await deleteTaskServer(editTask);
                deleteTaskFromList(task.id);
                // Close the modal
                buttonRef.current.click();
            }
        } catch (error) {
            console.error("Error deleting task", error)
        }
    };

    return (
        <>
            <div className="modal fade" id="taskModal" tabIndex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div style={task && { backgroundColor: colorsForModal[task.color]?.["modal-footer"] }}
                            className="modal-header">
                            <h5 className="modal-title" id="taskModalLabel">{"Edit Task"}</h5>
                            <button ref={buttonRef} onClick={resetErrors}
                                type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div style={task && { backgroundColor: colorsForModal[task.color]?.["modal-body"] }} className="modal-body">
                            <form>
                                {/* Title Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="taskTitle" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-8">
                                        <input
                                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                                            type="text"
                                            className="form-control"
                                            id="taskTitle"
                                            placeholder="Enter task title"
                                            value={task.title}
                                            onChange={handleTitleChange}
                                        />
                                    </div>
                                    <span style={{ color: 'red' }} className="error">{titleError}</span>
                                </div>

                                {/* Description Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="taskDescription" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-8">
                                        <textarea
                                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                                            className="form-control"
                                            id="taskDescription"
                                            rows="3"
                                            placeholder="Enter task description"
                                            value={task.description}
                                            onChange={handleDescriptionChange}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Due Date Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="dueDate" className="col-sm-2 col-form-label">Due Date</label>
                                    <div className="col-sm-8">
                                        <input
                                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                                            type="date"
                                            className="form-control"
                                            id="dueDate"
                                            value={updateDueDate}
                                            onChange={handleDueDateChange}
                                        />
                                    </div>
                                    <span style={{ color: 'red' }} className="error">{dueDateError}</span>
                                </div>

                                {/* Status Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                                    <div className="col-sm-8">
                                        <select
                                            style={task && { backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                                            className="form-select"
                                            id="status"
                                            value={task.status}
                                            onChange={handleStatusChange}
                                        >
                                            <option value="ToDo">ToDo</option>
                                            <option value="InProgress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </div>
                                    <span style={{ color: 'red' }} className="error">{statusError}</span>

                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div style={task && { backgroundColor: colorsForModal[task.color]?.["modal-footer"] }}
                            className={`modal-footer ${"justify-content-between"}`}>
                            <button type="button" className="btn btn-danger" onClick={deleteTask}>
                                Delete Task
                            </button>
                            <div>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={handleTaskChanged}>Save Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default EditTask;