# To Do List

This is a simple application built with React for the frontend and ASP.NET Core Web API for the backend. The application allows users to create, view, edit, delete, and search tasks. Tasks can be managed with attributes such as Title, Description, Status (To Do, In Progress, Done), and Due Date.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Features](#features)
- [Bonus Features](#bonus-features)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed (for React frontend)
- **.NET 6 SDK** installed (for ASP.NET Core backend)
- **MongoDB** installed and running 

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### 2. Backend (ASP.NET Core Web API)

1. Navigate to the backend project directory:

    ```bash
    cd TaskManagementApi
    ```

2. Install the required dependencies:

    ```bash
    dotnet restore
    ```

3. Configure the database settings in `appsettings.json`:

    - **MongoDB:**

      ```json
      "DatabaseSettings": {
        "ConnectionString": "mongodb://localhost:27017",
        "DatabaseName": "TaskManagementDb",
        "TasksCollectionName": "Tasks"
      }
      ```
      
4. Run the application:

    ```bash
    dotnet run
    ```

### 3. Frontend (React)

1. Navigate to the frontend project directory:

    ```bash
    cd task-management-ui
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Run the React application:

    ```bash
    npm start
    ```

## Running the Application

After completing the installation steps, you can access the application as follows:

1. **Backend (ASP.NET Core Web API):**

   - The API will be running at `https://localhost:7093`.

2. **Frontend (React):**

   - The React application will be running at `http://localhost:3000`.

## Project Structure

### Backend (ASP.NET Core Web API)

- **Controllers**: API endpoints are defined here (`TasksController.cs`).
- **Models**: Contains the `Task` model class representing the data structure.
- **Repositories**: Contains the `TaskRepository` that interacts with the database.
- **Services**: Contains the service logic if needed.

### Frontend (React)

- **components**: Contains reusable React components (`TaskList`, `TaskDetail`, `TaskForm`).
- **pages**: Contains page components for different routes (`TaskListPage`, `TaskDetailPage`).
- **services**: Contains services for API calls (`taskService.js`).
- **App.js**: Main app component that handles routing.
- **index.js**: Entry point of the React application.

## API Endpoints

- **GET /api/tasks**: Retrieve a list of all tasks.
- **GET /api/tasks/{id}**: Retrieve the details of a specific task.
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/{id}**: Update an existing task.
- **DELETE /api/tasks/{id}**: Delete a task.

## Frontend Overview

- **Task List Overview Page**: Displays all tasks, sortable by title and due date.
- **Task Details Page**: Displays and allows editing of a single task.
- **Create New Task Page**: Form to create a new task.
- **Delete Task**: Functionality to delete a task from the list.
- **Search Functionality**: Allows users to search for tasks by title or description.

## Backend Overview

- **Task Model**: Defines the structure of a task.
- **Repository Layer**: Handles database interactions.
- **Validation**: Ensures that the title is not empty and the due date is not in the past.
- **Error Handling**: Returns appropriate HTTP status codes for various conditions.

## Features

- Task List with Sorting by Title and Due Date.
- Task Details Page with Edit Functionality.
- Create New Task Form with Validation.
- Delete Task Functionality.
- Search Tasks by Title or Description.

## Bonus Features

- Pagination on the task list overview page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

This README provides a comprehensive overview of the project and guides users and developers through the installation, setup, and usage of the application. You can adapt this template based on specific details or preferences in your project.
