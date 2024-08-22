import { useContext, useEffect, useRef, useState } from "react";
import "../style/EditOrCreate.css";
import { AuthContext } from "../AuthContext";
import { createTask, deleteTaskServer, updateTask } from "../utils/TaskServiceCalls";
import { DescriptionValidation, DueDateValidation, StatusValidation, TitleValidation } from "./Validation";
import { convertDateFormat } from "../utils/DateConverter";
import { colors, colorsForModal } from "../utils/variables";

function EditOrCreate() {
    const { editTask, setEditTaskFun, addItemToTasksList, deleteTaskFromList, updateItemInTasksList, tasksList } = useContext(AuthContext);
    const [task, setTask] = useState(editTask && { ...editTask, dueDate: convertDateFormat(editTask.dueDate) } || {
        title: "",
        description: "",
        dueDate: "",
        status: "ToDo"
    });

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [dueDateError, setDueDateError] = useState("");
    const [statusError, setStatusError] = useState("");
    const buttonRef = useRef(null);

    useEffect(() => {
        if (editTask != null) {
            setTask({ ...editTask, dueDate: convertDateFormat(editTask.dueDate) });
        } else {
            setTask({ title: "", description: "", dueDate: "", status: "ToDo" });
        }
    }, [editTask]);

    const handleTitleChange = (e) => {
        setTask({ ...task, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setTask({ ...task, description: e.target.value });
    };

    const handleDueDateChange = (e) => {
        setTask({ ...task, dueDate: e.target.value });
    };

    const handleStatusChange = (e) => {
        setTask({ ...task, status: e.target.value });
    };


    const handleTaskChanged = () => {
        if (TitleValidation(task.title, setTitleError) && DescriptionValidation(task.description, setDescriptionError) && DueDateValidation(task.dueDate, setDueDateError) && StatusValidation(task.status, setStatusError)) {
            if (editTask) {
                updateTask(task).then(() => {
                    updateItemInTasksList(task);
                }).catch(error => {
                    console.error("Error updating task", error);
                });
                setEditTaskFun(null);
                setTask({ title: "", description: "", dueDate: "", status: "ToDo" });
                // Close the modal
                buttonRef.current.click();
                return () => {
                    buttonRef.current.removeEventListener('click');
                };
            } else {
                createTask(task).then(response => {

                    addItemToTasksList({ ...response, color: colors[tasksList.length % colors.length] });
                    // Close the modal
                    buttonRef.current.click();
                    return () => {
                        buttonRef.current.removeEventListener('click');
                    };
                }).catch(error => {
                    console.error("Error saving task", error);
                });
            }
        }
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
                        <div style={{ backgroundColor: colorsForModal[task.color]?.["modal-footer"] }} 
                        className="modal-header">
                            <h5 className="modal-title" id="taskModalLabel">{editTask ? "Edit Task" : "Add New Task"}</h5>
                            <button ref={buttonRef}
                                type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div style={{backgroundColor: colorsForModal[task.color]?.["modal-body"]}} className="modal-body">
                            <form>
                                {/* Title Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="taskTitle" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-8">
                                        <input
                                            style={{ backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                                            type="text"
                                            className="form-control"
                                            id="taskTitle"
                                            placeholder="Enter task title"
                                            value={task.title}
                                            onChange={handleTitleChange}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <span style={{ color: 'red' }} className="error">{titleError}</span>
                                    </div>
                                </div>

                                {/* Description Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="taskDescription" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-8">
                                        <textarea
                                            style={{ backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"] }}
                                            className="form-control"
                                            id="taskDescription"
                                            rows="3"
                                            placeholder="Enter task description"
                                            value={task.description}
                                            onChange={handleDescriptionChange}
                                        ></textarea>
                                    </div>
                                    <div className="col-sm-2">
                                        <span style={{ color: 'red' }} className="error">{descriptionError}</span>
                                    </div>
                                </div>

                                {/* Due Date Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="dueDate" className="col-sm-2 col-form-label">Due Date</label>
                                    <div className="col-sm-8">
                                        <input
                                        style={{backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"]}}
                                            type="date"
                                            className="form-control"
                                            id="dueDate"
                                            value={task.dueDate}
                                            onChange={handleDueDateChange}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <span style={{ color: 'red' }} className="error">{dueDateError}</span>
                                    </div>
                                </div>

                                {/* Status Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                                    <div className="col-sm-8">
                                        <select
                                        style={{backgroundColor: colorsForModal[task.color]?.["form-control-select-back"], borderColor: colorsForModal[task.color]?.["form-control-select-border"]}}
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
                                    <div className="col-sm-2">
                                        <span style={{ color: 'red' }} className="error">{statusError}</span>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div style={{ backgroundColor: colorsForModal[task.color]?.["modal-footer"] }}
                            className={`modal-footer ${editTask ? "justify-content-between" : "justify-content-end"}`}>
                            {editTask && (
                                <button type="button" className="btn btn-danger" onClick={deleteTask}>
                                    Delete Task
                                </button>
                            )}
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

export default EditOrCreate;
