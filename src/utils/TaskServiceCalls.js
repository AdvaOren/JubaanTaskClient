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

export async function deleteTaskServer(task) {
    try {
        console.log("task.id", task.id);
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