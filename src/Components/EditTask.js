
import React, { useContext, useState, useRef } from 'react';
import '../style/EditTask.css';
import { DueDateValidation, StatusValidation, TitleValidation } from "./Validation";
import { createTask } from "../utils/TaskServiceCalls";
import { AuthContext } from '../AuthContext';
import { colors } from '../utils/variables';
import { format } from 'date-fns';

function EditTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('ToDo');
    const [dueDate, setDueDate] = useState('');
    const [titleError, setTitleError] = useState("");
    const [dueDateError, setDueDateError] = useState("");
    const [statusError, setStatusError] = useState("");
    const { addItemToTasksList, tasksList } = useContext(AuthContext);
    const buttonRef = useRef(null);


    const handleTaskChanged = (e) => {
        e.preventDefault();
        if (TitleValidation(title, setTitleError) &&
            DueDateValidation(dueDate, setDueDateError) &&
            StatusValidation(status, setStatusError)) {

            const task = { title: title, description: description, status: status, dueDate: dueDate };
            createTask(task).then(response => {
                addItemToTasksList({ ...response, dueDate: format(new Date(dueDate), 'dd/MM/yyyy'), color: colors[tasksList.length % colors.length] });
                closeModal();
            }).catch(error => {
                console.error("Error saving task", error);
            });
        }
    };
    const resetStates = () => {
        setTitleError("");
        setDueDateError("");
        setStatusError("");
        setTitle("");
        setDescription("");
        setDueDate("");
        setStatus("ToDo");
    };

    const closeModal = () => {
        resetStates();
        // Close the modal
        buttonRef.current.click();
        return () => {
            buttonRef.current.removeEventListener('click');
        };
    }

    return (
        <>
            <div className="modal fade" id="taskModal" tabIndex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div
                            className="modal-header">
                            <h5 className="modal-title" id="taskModalLabel">Add Task</h5>
                            <button ref={buttonRef} onClick={resetStates}
                                type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            <form>
                                {/* Title Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="taskTitle" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="taskTitle"
                                            placeholder="Enter task title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <span style={{ color: 'red' }} className="error">{titleError}</span>
                                </div>

                                {/* Description Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="taskDescription" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-8">
                                        <textarea
                                            className="form-control"
                                            id="taskDescription"
                                            rows="3"
                                            placeholder="Enter task description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Due Date Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="dueDate" className="col-sm-2 col-form-label">Due Date</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dueDate"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </div>
                                    <span style={{ color: 'red' }} className="error">{dueDateError}</span>
                                </div>

                                {/* Status Row */}
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                                    <div className="col-sm-8">
                                        <select
                                            className="form-select"
                                            id="status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
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
                        <div className='btn-modal'>
                            <button onClick={closeModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={handleTaskChanged}>Save Task</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditTask;
