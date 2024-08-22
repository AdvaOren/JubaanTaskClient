/**
 * getTaskList
 * 
 * Fetches the list of tasks from the API.
 * 
 * @returns {Array} - An array of task objects if the fetch is successful.
 */
export async function getTaskList() {
    try {
        // Fetch tasks from the API
        const response = await fetch('https://localhost:7093/api/tasks');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

/**
 * createTask
 * 
 * Sends a POST request to the API to create a new task.
 * 
 * @param {Object} task - The task object to be created.
 * @returns {Object} - The created task object from the server.
 * @throws {Error} - Throws an error if the task creation fails.
 */
export async function createTask(task) {
    try {
        const response = await fetch('https://localhost:7093/api/Tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // The created task object
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

/**
 * deleteTaskServer
 * 
 * Sends a DELETE request to the API to delete a specific task.
 * 
 * @param {Object} task - The task object to be deleted (must include the task's ID).
 * @returns {Object} - The response object from the server.
 * @throws {Error} - Throws an error if the task deletion fails.
 */
export async function deleteTaskServer(task) {
    try {
        const response = await fetch(`https://localhost:7093/api/Tasks/${task.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response; // The response object
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

/**
 * updateTask
 * 
 * Sends a PUT request to the API to update a specific task.
 * 
 * @param {Object} task - The task object with updated details (must include the task's ID).
 * @returns {Object} - The response object from the server.
 * @throws {Error} - Throws an error if the task update fails.
 */
export async function updateTask(task) {
    try {
        const response = await fetch(`https://localhost:7093/api/Tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response; 
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}