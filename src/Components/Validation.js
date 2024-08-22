/**
 * TitleValidation
 * 
 * Validates the task title to ensure it is not empty. 
 * If the title is valid (i.e., not empty), it returns true.
 * If the title is empty, it sets an error message and returns false.
 * 
 * @param {string} title - The title of the task to validate.
 * @param {function} setTitleError - The function to set the title error message.
 * @returns {boolean} - Returns true if the title is valid, otherwise false.
 */
export const TitleValidation = (title, setTitleError) => {
    setTitleError(""); // Clear any existing error
    if (title.length > 0) {
        return true; 
    }
    setTitleError("Title is required"); 
    return false;
}

/**
 * DueDateValidation
 * 
 * Validates the due date to ensure it is not in the past. 
 * The due date must be greater than or equal to the current date.
 * If the due date is valid, it returns true. Otherwise, it sets an error message and returns false.
 * 
 * @param {string} dueDate - The due date of the task to validate.
 * @param {function} setDueDateError - The function to set the due date error message.
 * @returns {boolean} - Returns true if the due date is valid, otherwise false.
 */
export const DueDateValidation = (dueDate, setDueDateError) => {
    setDueDateError(""); // Clear any existing error
    const inputDate = new Date(dueDate);
    const currentDate = new Date();

    // Set the time of both dates to midnight to compare only the date part
    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate >= currentDate) {
        return true; 
    }

    setDueDateError("Due date must be greater than or equal to today"); // Set error message if due date is in the past
    return false;
}

/**
 * StatusValidation
 * 
 * Validates the task status to ensure it is one of the accepted values: "ToDo", "InProgress", or "Done".
 * If the status is valid, it returns true. Otherwise, it sets an error message and returns false.
 * 
 * @param {string} status - The status of the task to validate.
 * @param {function} setStatusError - The function to set the status error message.
 * @returns {boolean} - Returns true if the status is valid, otherwise false.
 */
export const StatusValidation = (status, setStatusError) => {
    setStatusError(""); // Clear any existing error
    if (status === "ToDo" || status === "InProgress" || status === "Done") {
        return true; 
    }
    setStatusError("Status must be To Do, In Progress, or Done"); 
    return false;
}
