import { set } from "date-fns";

export const TitleValidation = (title, setTitleError) => {
    setTitleError("");
    if (title.length > 0) {
        return true;
    }
    setTitleError("Title is required");
    return false;
}

export const DescriptionValidation = (description, setDescriptionError) => {
    setDescriptionError("");    
    if (description.length > 0) {
        return true;
    }
    setDescriptionError("Description is required");
    return false;
}

export const DueDateValidation = (dueDate, setDueDateError) => {
    setDueDateError("");
    const inputDate = new Date(dueDate);
    const currentDate = new Date();

    // Set the time of both dates to midnight to compare only the date part
    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    if (inputDate >= currentDate) {
        return true;
    }
    setDueDateError("Due date must be greater than or equal to today");
    return false;
}

export const StatusValidation = (status, setStatusError) => {
    setStatusError("");
    if (status == "ToDo" || status == "InProgress" || status == "Done") {
        return true;
    }
    setStatusError("Status must be To Do, In Progress, or Done");
    return false;
}