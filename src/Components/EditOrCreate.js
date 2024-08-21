import { useContext, useEffect, useRef, useState } from "react";
import "../style/EditOrCreate.css";
import { AuthContext } from "../AuthContext";
import { createTask, deleteTaskServer } from "../utils/TaskServiceCalls";
import { DescriptionValidation, DueDateValidation, StatusValidation, TitleValidation } from "./Validation";

function EditOrCreate() {
    const { editTask, addItemToTasksList, deleteTaskFromList } = useContext(AuthContext);
    const [task, setTask] = useState(editTask || {
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
        if (editTask) {
            setTask(editTask);
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

    const newTask = () => {
        if (TitleValidation(task.title, setTitleError) && DescriptionValidation(task.description, setDescriptionError) && DueDateValidation(task.dueDate, setDueDateError) && StatusValidation(task.status, setStatusError)) {
            createTask(task).then(response => {
                addItemToTasksList(response);
                // Close the modal
                buttonRef.current.click();
                return () => {
                    buttonRef.current.removeEventListener('click');
                };
            }).catch(error => {
                console.error("Error saving task", error);
            });
        }
    };

    const deleteTask = async () => {
        try {
            if (editTask) {
                await deleteTaskServer(editTask);
                console.log("Deleting task", task);
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
                        <div className="modal-header">
                            <h5 className="modal-title" id="taskModalLabel">{editTask ? "Edit Task" : "Add New Task"}</h5>
                            <button ref={buttonRef}
                                type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="taskTitle" className="form-label">Title</label><br />
                                    <span style={{ color: 'red' }} className="error">{titleError}</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="taskTitle"
                                        placeholder="Enter task title"
                                        value={task.title}
                                        onChange={handleTitleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="taskDescription" className="form-label">Description</label><br />
                                    <span style={{ color: 'red' }} className="error">{descriptionError}</span>
                                    <textarea
                                        className="form-control"
                                        id="taskDescription"
                                        rows="3"
                                        placeholder="Enter task description"
                                        value={task.description}
                                        onChange={handleDescriptionChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dueDate" className="form-label">Due Date</label><br />
                                    <span style={{ color: 'red' }} className="error">{dueDateError}</span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dueDate"
                                        value={task.dueDate}
                                        onChange={handleDueDateChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label><br />
                                    <span style={{ color: 'red' }} className="error">{statusError}</span>
                                    <select
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
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className={`modal-footer ${editTask ? "justify-content-between" : "justify-content-end"}`}>
                            {editTask && (
                                <button type="button" className="btn btn-danger" onClick={deleteTask}>
                                    Delete Task
                                </button>
                            )}
                            <div>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={newTask}>Save Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditOrCreate;
