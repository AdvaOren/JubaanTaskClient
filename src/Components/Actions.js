import { useContext, useState } from 'react';
import { ReactComponent as AddIcon } from '../assets/icons/addTask.svg';
import '../style/Actions.css';
import { AuthContext } from '../AuthContext';
import { Sort } from '../utils/Sort';

/**
 * Actions Component
 * 
 * The Actions component provides a set of controls for filtering, searching, 
 * and adding tasks in the task management application. It allows users to filter 
 * the task list by different criteria (e.g., date, title), search tasks by title 
 * or description, and trigger the modal to add a new task.
 */
function Actions() {
    const { tasksList, setFilteredListFun, currFilter, setCurrFilter } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    // Sorts the task list based on the selected criteria
    const sortTasks = (criteria) => {
        setCurrFilter(criteria);
        setShowDropdown(false);
        let sortedList = Sort(criteria, [...tasksList]);
        setFilteredListFun(sortedList);
    };


    // Handles changes to the search input field
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterTasksBySearch(event.target.value);
    };

    // Filters the task list based on the search term
    const filterTasksBySearch = (term) => {
        const filteredList = tasksList.filter(task =>
            task.title.toLowerCase().includes(term.toLowerCase()) ||
            task.description.toLowerCase().includes(term.toLowerCase())
        );
        let sortedList = Sort(currFilter, filteredList);
        setFilteredListFun(sortedList);
    };

    return (
        < div className="actions" >

            {/* Container for the filter button and dropdown */}
            <div className="filterContainer">
                <button className="filterButton" onClick={() => setShowDropdown(!showDropdown)}>
                    Filter by <i className="arrow down"></i>
                </button>
                {showDropdown && (
                    <div className="dropdownMenu">
                        <button onClick={() => sortTasks('date')}>Date</button>
                        <button onClick={() => sortTasks('title')}>Title</button>
                    </div>
                )}
            </div>

            {/* Search input for filtering tasks by title or description */}
            <input
                value={searchTerm} onChange={handleSearchChange}
                type="text" id="searchTaskInput" placeholder="Search Task">
            </input>

            {/* Icon to trigger the modal for adding a new task */}
            <AddIcon type="button"
                id="addIcon"
                // onClick={newTask}
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
            />
        </div >
    );
}

export default Actions;